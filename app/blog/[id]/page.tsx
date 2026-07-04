import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { getBlogById, getAllBlogs, Blog } from '@/lib/db';

function getReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ id: String(blog.id) }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Must await params
  const { id } = await params;

  const blogId = parseInt(id, 10);
  if (isNaN(blogId)) notFound();

  const blog = await getBlogById(blogId);
  if (!blog) notFound();

  const allBlogs = await getAllBlogs();
  const recentBlogs = allBlogs.filter((b) => b.id !== blogId).slice(0, 3);
  const readTime = getReadTime(blog.description);
  const isHtml = /<[a-z][\s\S]*>/i.test(blog.description);

  // ... rest of the JSX unchanged
  return (
    <>
      <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-500 text-sm mt-4">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-[#e52423]" />
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-[#e52423]" />
              {readTime} min read
            </span>
          </div>
          <div className="mt-6 text-left bg-orange-50/60 border-l-4 border-[#e52423] rounded-r-xl p-4 text-gray-700 text-lg font-medium">
            {blog.meta_description}
          </div>
        </header>

        <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 mb-8">
          <Image
            src={`/uploads/${blog.banner_image}`}
            alt={blog.title}
            width={800}
            height={400}
            className="w-full max-h-[500px] object-contain rounded-2xl"
          />
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          {isHtml ? (
            <div dangerouslySetInnerHTML={{ __html: blog.description }} />
          ) : (
            blog.description.split(/\n\s*\n/).map((para, i) => <p key={i}>{para}</p>)
          )}
        </div>
      </article>

      {recentBlogs.length > 0 && (
        <section className="bg-gray-50/80 py-12 md:py-16 border-t border-gray-200 mt-12">
          <div className="container mx-auto px-4">
            <h4 className="text-2xl md:text-3xl font-bold text-center mb-8">
              More <span className="bg-gradient-to-r from-[#e52423] to-[#b91c1c] bg-clip-text text-transparent">Case Studies</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentBlogs.map((recent) => (
                <div key={recent.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-lg hover:border-red-200/50">
                  <div className="bg-gray-50 flex items-center justify-center p-4 h-40 border-b border-gray-100">
                    <Image
                      src={`/uploads/${recent.banner_image}`}
                      alt={recent.title}
                      width={300}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h5 className="font-bold text-gray-900 line-clamp-2">{recent.title}</h5>
                    <Link
                      href={`/blog/${recent.id}`}
                      className="mt-auto font-bold text-sm text-gray-900 inline-flex items-center gap-1.5 border-b-2 border-[#e52423] pb-1 w-fit transition-all hover:text-[#e52423] hover:gap-2.5"
                    >
                      Read Story <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
