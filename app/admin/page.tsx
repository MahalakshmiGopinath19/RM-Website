'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  FaCompass, 
  FaGem, 
  FaSignOutAlt, 
  FaSearch, 
  FaTimesCircle, 
  FaPlusCircle, 
  FaEdit, 
  FaTrash, 
  FaCloudUploadAlt, 
  FaBold, 
  FaItalic, 
  FaLink, 
  FaImage,
  FaUser,
  FaLock,
  FaSpinner
} from 'react-icons/fa';
import { fetchBlogs, createBlogAction, editBlogAction, removeBlogAction } from './actions';
import { Blog } from '@/lib/db';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentBlogId, setCurrentBlogId] = useState<string | null>(null);
  
  // Form states
  const [title, setTitle] = useState<string>('');
  const [metaTitle, setMetaTitle] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [bannerImage, setBannerImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Check authentication on load
  useEffect(() => {
    const auth = sessionStorage.getItem('vaave_admin_auth');
    if (auth === 'true') {
      setIsLoggedIn(true);
      loadBlogs();
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'rainbowmedia' && password === 'RainbowMedia2026') {
      sessionStorage.setItem('vaave_admin_auth', 'true');
      setIsLoggedIn(true);
      setLoginError('');
      loadBlogs();
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('vaave_admin_auth');
    setIsLoggedIn(false);
    setBlogs([]);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFormError('');

    const formData = new FormData();
    formData.append('banner_image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBannerImage(data.filename);
      } else {
        setFormError(data.error || 'Failed to upload image.');
      }
    } catch (err) {
      setFormError('Network error during image upload.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setCurrentBlogId(null);
    setTitle('');
    setMetaTitle('');
    setMetaDescription('');
    setDescription('');
    setBannerImage('');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (blog: Blog) => {
    setModalMode('edit');
    setCurrentBlogId(blog.id);
    setTitle(blog.title);
    setMetaTitle(blog.meta_title);
    setMetaDescription(blog.meta_description);
    setDescription(blog.description);
    setBannerImage(blog.banner_image);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !metaTitle || !metaDescription || !description || !bannerImage) {
      setFormError('All fields including the banner image are required.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      let success = false;
      const blogData = { title, meta_title: metaTitle, meta_description: metaDescription, description, banner_image: bannerImage };

      if (modalMode === 'add') {
        success = await createBlogAction(blogData);
      } else if (modalMode === 'edit' && currentBlogId) {
        success = await editBlogAction(currentBlogId, blogData);
      }

      if (success) {
        setIsModalOpen(false);
        loadBlogs();
      } else {
        setFormError('Failed to save the blog post.');
      }
    } catch (err) {
      setFormError('An error occurred while saving.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post permanently?')) return;
    try {
      const success = await removeBlogAction(id);
      if (success) {
        loadBlogs();
      } else {
        alert('Failed to delete the blog post.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during deletion.');
    }
  };

  const insertTag = (tagOpen: string, tagClose: string) => {
    const textarea = document.getElementById('formFieldDesc') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = tagOpen + selected + tagClose;

    setDescription(text.substring(0, start) + replacement + text.substring(end));
    
    // Refocus textarea and place cursor inside tag
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selected.length);
    }, 0);
  };

  // Search filter
  const filteredBlogs = blogs.filter((blog) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      blog.title.toLowerCase().includes(term) ||
      blog.meta_description.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <style>{`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(145deg, #f4f7fc 0%, #eef2f6 100%);
          font-family: 'Inter', sans-serif;
        }
        .login-card {
          background: #ffffff;
          border-radius: 2rem;
          width: 100%;
          max-width: 1100px;
          box-shadow: 0 25px 45px -12px rgba(0,0,0,0.25);
          overflow: hidden;
          display: flex;
        }
        .brand-display-column {
          width: 50%;
          padding: 3rem 4rem;
          background: #0A0930;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .brand-display-column img {
          max-width: 80%;
          margin-bottom: 1.5rem;
        }
        .logo-bright {
          filter: brightness(1.1) contrast(1.05) drop-shadow(0 2px 4px rgba(0,0,0,0.05));
          transition: all 0.2s;
        }
        .logo-bright:hover {
          filter: brightness(1.15) contrast(1.08) drop-shadow(0 4px 8px rgba(209,143,92,0.15));
        }
        .login-panel-desc {
          color: #cbd5e1;
          font-size: 1rem;
          line-height: 1.5;
        }
        .login-form-side {
          width: 50%;
          background: #ffffff;
          padding: 3rem 4rem;
          border-left: 1px solid #f0deda;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .heading-signin {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #E0A36A 0%, #EFD3C9 25%, #CD8E83 50%, #9C5B5A 75%, #E0A36A 100%);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 1.8rem;
        }
        .input-group-custom {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .input-group-custom .icon {
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
        }
        .form-control-custom {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 1px solid #e2e8f0;
          border-radius: 1.25rem;
          background: #fefefe;
          font-size: 0.95rem;
          color: #1a202c;
          transition: all 0.2s;
        }
        .form-control-custom:focus {
          border-color: #E0A36A;
          box-shadow: 0 0 0 4px rgba(224,163,106,0.1);
          outline: none;
        }
        .btn-agency-login {
          background: #E0A36A;
          border: none;
          padding: 0.9rem;
          border-radius: 1.5rem;
          font-weight: 700;
          font-size: 1rem;
          color: white;
          width: 100%;
          transition: all 0.2s;
          box-shadow: 0 6px 14px rgba(224,163,106,0.3);
          cursor: pointer;
        }
        .btn-agency-login:hover {
          background: #9C5B5A;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(224,163,106,0.4);
        }

        /* Dashboard styles */
        .app-layout-wrapper {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(145deg, #f4f7fc 0%, #eef2f6 100%);
          font-family: 'Inter', sans-serif;
          color: #1a202c;
        }
        .sidebar-panel {
          width: 280px;
          background: #0A0930;
          border-right: 1px solid rgba(255,255,255,0.08);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .sidebar-brand-wrapper {
          margin-bottom: 2.5rem;
        }
        .menu-link-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1.2rem;
          border-radius: 1rem;
          color: #cbd5e1;
          text-decoration: none !important;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
          margin-bottom: 0.5rem;
          cursor: pointer;
        }
        .menu-link-item:hover {
          background: rgba(255,255,255,0.03);
          color: #E0A36A;
          transform: translateX(4px);
        }
        .menu-link-item.active {
          background: #E0A36A;
          color: white;
          box-shadow: 0 4px 12px rgba(224,163,106,0.2);
        }
        .logout-brand-btn {
          margin-top: auto;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 1.5rem;
        }
        .main-viewport {
          flex: 1;
          padding: 2rem 2.5rem;
          overflow-y: auto;
        }
        .viewport-top-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .search-wrapper {
          background: white;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.5rem 1rem 0.5rem 1.2rem;
          border-radius: 3rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          border: 1px solid #e2e8f0;
          transition: all 0.2s;
        }
        .search-wrapper:focus-within {
          border-color: #E0A36A;
          box-shadow: 0 0 0 3px rgba(224,163,106,0.1);
        }
        .search-input {
          border: none;
          padding: 0.6rem 0;
          width: 260px;
          background: transparent;
          font-size: 0.9rem;
          outline: none;
          color: #1a202c;
        }
        .search-reset-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .search-reset-btn:hover {
          color: #E0A36A;
        }
        .btn-add-trigger {
          background: linear-gradient(135deg, #E0A36A, #9C5B5A);
          color: white;
          border: none;
          padding: 0.75rem 1.8rem;
          border-radius: 2.5rem;
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          transition: all 0.2s;
          box-shadow: 0 6px 14px rgba(224,163,106,0.25);
          cursor: pointer;
        }
        .btn-add-trigger:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px rgba(224,163,106,0.35);
          background: linear-gradient(135deg, #EFD3C9, #E0A36A);
        }
        .workspace-panel-card {
          background: rgba(255,255,255,0.96);
          border-radius: 1.8rem;
          box-shadow: 0 20px 35px -12px rgba(0,0,0,0.08);
          padding: 1.8rem;
          border: 1px solid rgba(224,163,106,0.1);
        }
        .management-grid-table {
          width: 100%;
          border-collapse: collapse;
        }
        .management-grid-table th {
          text-align: left;
          padding: 1.2rem 0.8rem;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #5b6e8c;
          border-bottom: 2px solid #eef2f8;
        }
        .management-grid-table td {
          padding: 1.2rem 0.8rem;
          border-bottom: 1px solid #f0f3f9;
          vertical-align: middle;
          font-size: 0.9rem;
          color: #1e293b;
        }
        .management-grid-table tr:hover td {
          background: #fefaf5;
        }
        .table-thumb-frame {
          width: 65px;
          height: 65px;
          object-fit: contain;
          background: #f9fbfd;
          border-radius: 1rem;
          border: 1px solid #eef2f8;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .table-thumb-frame:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(0,0,0,0.08);
        }
        .btn-action-edit {
          display: inline-block;
          background: #0A0930;
          color: white;
          padding: 0.5rem 1.2rem;
          border-radius: 2rem;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          margin-right: 0.6rem;
          transition: all 0.2s;
          box-shadow: 0 2px 6px rgba(10,9,48,0.2);
          border: none;
          cursor: pointer;
        }
        .btn-action-edit:hover {
          background: #151445;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(10,9,48,0.3);
          color: white;
        }
        .btn-action-delete {
          display: inline-block;
          background: #dc3545;
          color: white;
          padding: 0.5rem 1.2rem;
          border-radius: 2rem;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 2px 6px rgba(220,53,69,0.2);
          border: none;
          cursor: pointer;
        }
        .btn-action-delete:hover {
          background: #bb2d3b;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(220,53,69,0.3);
          color: white;
        }
        .badge-luxury {
          background: linear-gradient(135deg, #f1f5f9, #eef2f6);
          color: #1e293b;
          padding: 0.5rem 1.2rem;
          border-radius: 2rem;
          font-weight: 600;
          font-size: 0.8rem;
          border: 1px solid #e2e8f0;
        }

        /* Modal styling */
        .modal-backdrop-custom {
          position: fixed;
          inset: 0;
          background: rgba(5,8,33,0.4);
          backdrop-filter: blur(4px);
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .modal-content-custom {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 2rem;
          width: 100%;
          max-width: 900px;
          padding: 2.5rem;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 35px 60px -20px rgba(0,0,0,0.3);
          border: 1px solid rgba(224,163,106,0.2);
          font-family: 'Inter', sans-serif;
          color: #1a202c;
        }
        .modal-header-custom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #E0A36A;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }
        .modal-title {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #E0A36A 0%, #EFD3C9 25%, #CD8E83 50%, #9C5B5A 75%, #E0A36A 100%);
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .modal-close-btn {
          background: none;
          border: none;
          font-size: 2rem;
          color: #a0aec0;
          cursor: pointer;
          line-height: 1;
        }
        .modal-close-btn:hover {
          color: #1a202c;
        }
        .upload-drop-circle {
          width: 180px;
          height: 180px;
          background: #ffffff;
          border-radius: 50%;
          margin: 0 auto 1.5rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px solid rgba(224,163,106,0.3);
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
          box-shadow: 0 10px 25px -8px rgba(0,0,0,0.1);
        }
        .upload-drop-circle:hover {
          border-color: #E0A36A;
          transform: scale(1.02);
          box-shadow: 0 15px 30px -8px rgba(224,163,106,0.2);
        }
        .upload-drop-circle-content {
          text-align: center;
        }
        .upload-drop-circle-content .icon {
          font-size: 2.8rem;
          color: #E0A36A;
          margin-bottom: 0.5rem;
        }
        .upload-drop-circle-content div {
          font-weight: 600;
          color: #1e293b;
          font-size: 0.9rem;
        }
        .form-control-dashboard {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 1.2rem;
          padding: 1rem 1.2rem;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
          color: #1a202c;
        }
        .form-control-dashboard:focus {
          border-color: #E0A36A;
          box-shadow: 0 0 0 4px rgba(224,163,106,0.12);
        }
        .form-label {
          display: block;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #475569;
          margin-bottom: 0.6rem;
        }
        .editor-toolbar {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-bottom: none;
          border-radius: 1.2rem 1.2rem 0 0;
          padding: 0.7rem 1rem;
          display: flex;
          gap: 1.2rem;
        }
        .editor-toolbar .tb-icon {
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1.1rem;
        }
        .editor-toolbar .tb-icon:hover {
          color: #E0A36A;
          transform: translateY(-2px);
        }
        .btn-submit-blog {
          background: linear-gradient(95deg, #E0A36A, #9C5B5A);
          border: none;
          padding: 0.9rem 2.5rem;
          border-radius: 3rem;
          font-weight: 700;
          font-size: 1rem;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(224,163,106,0.3);
        }
        .btn-submit-blog:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 25px rgba(224,163,106,0.4);
          background: linear-gradient(95deg, #EFD3C9, #E0A36A);
        }

        @media (max-width: 992px) {
          .login-card { max-width: 90%; }
          .main-viewport { padding: 1.5rem; }
          .sidebar-panel { width: 240px; }
        }
        @media (max-width: 768px) {
          .login-card { flex-direction: column; border-radius: 1.5rem; }
          .brand-display-column, .login-form-side { width: 100%; padding: 2rem 2.5rem; }
          .brand-display-column { border-bottom: 1px solid #f0deda; }
          .login-form-side { border-left: none; }
          .app-layout-wrapper { flex-direction: column; }
          .sidebar-panel { width: 100%; height: auto; position: static; padding: 1.5rem 1rem; }
          .sidebar-brand-wrapper { margin-bottom: 1rem; display: flex; justify-content: center; }
          .sidebar-brand-wrapper img { max-height: 50px; }
          .sidebar-panel nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
          .menu-link-item { margin-bottom: 0; padding: 0.6rem 1rem; }
          .logout-brand-btn { margin-top: 1rem; padding-top: 1rem; display: flex; justify-content: center; }
          .main-viewport { padding: 1.5rem 1rem; }
          .search-input { width: 100%; }
          .viewport-top-navbar { flex-direction: column; align-items: stretch; }
          .search-wrapper { justify-content: space-between; }
          .btn-add-trigger { justify-content: center; }
        }
      `}</style>

      {/* LOGIN PANEL */}
      {!isLoggedIn ? (
        <div className="auth-wrapper">
          <div className="login-card">
            <div className="brand-display-column">
              <Image 
                src="/image/vaave-digital.webp" 
                alt="Vaave Digital" 
                width={300} 
                height={75} 
                className="logo-bright"
                priority
              />
              <p className="login-panel-desc">
                Access your creative command center. Refined control for visionary content.
              </p>
            </div>
            <div className="login-form-side">
              <h4 className="heading-signin">Sign In</h4>
              {loginError && (
                <div style={{ color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', padding: '0.75rem 1.25rem', borderRadius: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  {loginError}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="input-group-custom">
                  <FaUser className="icon" />
                  <input 
                    type="text" 
                    required 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control-custom" 
                    placeholder="Username" 
                  />
                </div>
                <div className="input-group-custom">
                  <FaLock className="icon" />
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control-custom" 
                    placeholder="Password" 
                  />
                </div>
                <button type="submit" className="btn-agency-login">Continue →</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* MAIN DASHBOARD */
        <div className="app-layout-wrapper">
          <aside className="sidebar-panel">
            <div>
              <div className="sidebar-brand-wrapper">
                <Image 
                  src="/image/vaave-digital.webp" 
                  alt="Vaave Digital" 
                  width={200} 
                  height={50} 
                  className="logo-bright"
                  priority
                />
              </div>
              <nav>
                <div className="menu-link-item active">
                  <FaCompass /> <span>Dashboard</span>
                </div>
                <a href="/blog" target="_blank" className="menu-link-item">
                  <FaGem /> <span>Public Feed</span>
                </a>
              </nav>
            </div>
            <div className="logout-brand-btn">
              <div onClick={handleLogout} className="menu-link-item">
                <FaSignOutAlt /> <span>Exit</span>
              </div>
            </div>
          </aside>

          <main className="main-viewport">
            <div className="viewport-top-navbar">
              <div className="search-wrapper">
                <FaSearch style={{ color: '#a0aec0' }} />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search blogs..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className="search-reset-btn" onClick={() => setSearchTerm('')}>
                    <FaTimesCircle />
                  </button>
                )}
              </div>
              <button className="btn-add-trigger" onClick={openAddModal}>
                <FaPlusCircle /> Add New Blog
              </button>
            </div>

            <div className="workspace-panel-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <h2 style={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.02rem', margin: 0 }}>
                  Blog <span style={{ color: '#E0A36A' }}>Collection</span>
                </h2>
                <span className="badge-luxury">{filteredBlogs.length} items</span>
              </div>

              {isLoading ? (
                <div style={{ textAlign: 'center', padding: '5rem 0', color: '#64748b' }}>
                  <FaSpinner className="animate-spin" style={{ fontSize: '2.5rem', color: '#E0A36A', margin: '0 auto 1rem auto' }} />
                  <p>Loading your collection...</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="management-grid-table">
                    <thead>
                      <tr>
                        <th style={{ width: '6%' }}>S.no</th>
                        <th style={{ width: '12%' }}>Image</th>
                        <th style={{ width: '42%' }}>BlogList</th>
                        <th style={{ width: '25%' }}>Title</th>
                        <th style={{ width: '15%', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog, idx) => (
                          <tr key={blog.id}>
                            <td>{idx + 1}</td>
                            <td>
                              <div style={{ position: 'relative', width: '65px', height: '65px' }}>
                                <Image 
                                  src={`/uploads/${blog.banner_image}`} 
                                  alt="blog" 
                                  fill
                                  sizes="65px"
                                  className="table-thumb-frame"
                                />
                              </div>
                            </td>
                            <td>
                              {blog.meta_description.length > 100 
                                ? blog.meta_description.substring(0, 100) + '…' 
                                : blog.meta_description
                              }
                            </td>
                            <td style={{ fontWeight: 600 }}>{blog.title}</td>
                            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                              <button 
                                onClick={() => openEditModal(blog)} 
                                className="btn-action-edit"
                              >
                                <FaEdit /> Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(blog.id)} 
                                className="btn-action-delete"
                              >
                                <FaTrash /> Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} style={{ textAlign: 'center', padding: '3rem 0', color: '#94a3b8' }}>
                            ✨ No blogs found. Click "Add New Blog" to create one.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {/* DASHBOARD EDIT/ADD MODAL */}
      {isModalOpen && (
        <div className="modal-backdrop-custom">
          <div className="modal-content-custom">
            <div className="modal-header-custom">
              <h4 className="modal-title m-0">
                {modalMode === 'add' ? 'Add Blog' : 'Edit Blog'}
              </h4>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              {formError && (
                <div style={{ color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', padding: '0.75rem 1.25rem', borderRadius: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                  {formError}
                </div>
              )}

              {/* Uploader Circle */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div className="upload-drop-circle" style={{ position: 'relative' }}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }}
                  />
                  {bannerImage ? (
                    <div style={{ position: 'absolute', inset: 0, padding: '0.8rem', backgroundColor: '#ffffff', zIndex: 5 }}>
                      <Image 
                        src={`/uploads/${bannerImage}`} 
                        alt="Preview" 
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="upload-drop-circle-content">
                      {isUploading ? (
                        <>
                          <FaSpinner className="icon animate-spin" />
                          <div>Uploading...</div>
                        </>
                      ) : (
                        <>
                          <FaCloudUploadAlt className="icon" />
                          <div>Upload Image</div>
                          <small style={{ color: '#64748b' }}>PNG, JPG, GIF</small>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Blog Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control-dashboard" 
                />
              </div>

              {/* Meta Description */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Meta Description</label>
                <textarea 
                  required
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="form-control-dashboard" 
                />
              </div>

              {/* Rich Text Editor */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Description</label>
                <div className="editor-toolbar">
                  <FaBold className="tb-icon" title="Bold" onClick={() => insertTag('<strong>', '</strong>')} />
                  <FaItalic className="tb-icon" title="Italic" onClick={() => insertTag('<em>', '</em>')} />
                  <FaLink className="tb-icon" title="Link" onClick={() => insertTag('<a href="https://">', '</a>')} />
                  <FaImage className="tb-icon" title="Image" onClick={() => insertTag('<img src="uploads/filename.jpg" alt="" />', '')} />
                </div>
                <textarea 
                  id="formFieldDesc"
                  required
                  rows={7}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control-dashboard" 
                  style={{ borderRadius: '0 0 1.2rem 1.2rem' }}
                />
              </div>

              {/* Meta Title */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Meta Title</label>
                <input 
                  type="text" 
                  required
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="form-control-dashboard" 
                />
              </div>

              {/* Actions footer */}
              <div style={{ borderTop: 'none', padding: 0, marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                <button 
                  type="submit" 
                  disabled={isSubmitting || isUploading}
                  className="btn-submit-blog"
                >
                  {isSubmitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaSpinner className="animate-spin" /> Saving...
                    </span>
                  ) : modalMode === 'add' ? 'Add' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
