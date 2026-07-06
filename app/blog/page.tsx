import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaArrowRight, FaFeatherAlt } from 'react-icons/fa';
import { getAllBlogs, Blog } from '@/lib/db';

export default async function BlogPage() {
  const blogs: Blog[] = await getAllBlogs();

  return (
    <>
      {/* Hero — sapphire background matching homepage */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#050821] to-[#0B0F33] text-center py-16 md:py-20 px-4 border-b border-white/10">
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#D18F5C]/5 rounded-full blur-3xl opacity-25" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#D18F5C]/5 rounded-full blur-3xl opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Our Insights &amp; Blogs
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-lg mx-auto">
            Explore creative development breakthroughs and targeted web methodologies from our workspace desk.
          </p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#D18F5C]/50 opacity-0 animate-fadeInUp"
                  style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                >
                  <div className="bg-gray-50/80 flex items-center justify-center p-4 h-60 border-b border-gray-100 transition-colors hover:bg-orange-50/10">
                    <Image
                      src={`/uploads/${blog.banner_image}`}
                      alt={blog.title}
                      width={400}
                      height={240}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                      <FaCalendarAlt className="text-[#D18F5C]" />
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <h5 className="text-xl font-bold text-gray-900 mb-2 transition-colors hover:text-[#D18F5C]">
                      {blog.title}
                    </h5>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.meta_description}
                    </p>
                    <Link
                      href={`/blog/${blog.id}`}
                      className="mt-auto font-bold text-sm text-gray-900 inline-flex items-center gap-2 border-b-2 border-[#D18F5C] pb-1 w-fit transition-all hover:text-[#D18F5C] hover:gap-3 group"
                    >
                      Read Article
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-gray-50/80 rounded-3xl border border-dashed border-gray-300">
                <FaFeatherAlt className="text-5xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No corporate case studies published yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
