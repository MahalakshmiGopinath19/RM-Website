// lib/db.ts – Mock data (no database connection)
export interface Blog {
  id: number;
  title: string;
  meta_title: string;
  meta_description: string;
  description: string;
  banner_image: string;
  created_at: string;
}

const mockBlogs: Blog[] = [
  {
    id: 1,
    title: '10 AI Tools That Will Transform Your Marketing',
    meta_title: 'AI Marketing Tools',
    meta_description: 'Discover the latest AI-powered tools reshaping digital marketing.',
    description: `<p>Artificial intelligence is no longer a futuristic concept—it's here and it's changing how we market.</p><p>From chatbots to predictive analytics, AI tools can automate tasks and give you deeper insights into your customers.</p><h2>Why AI matters</h2><p>... full content ...</p>`,
    banner_image: 'ai-tools.jpg',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'How to Build a Scalable Brand with Data',
    meta_title: 'Data-Driven Branding',
    meta_description: 'Learn how data-driven decisions can help your brand grow sustainably.',
    description: '<p>Data is the new oil. Learn how to refine it for growth.</p>',
    banner_image: 'data-brand.jpg',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  // Add more entries as needed
];

export async function getAllBlogs(): Promise<Blog[]> {
  return mockBlogs;
}

export async function getBlogById(id: number): Promise<Blog | null> {
  return mockBlogs.find((b) => b.id === id) || null;
}