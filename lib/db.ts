import { MongoClient, ObjectId } from 'mongodb';

export interface Blog {
  id: string;
  title: string;
  meta_title: string;
  meta_description: string;
  description: string;
  banner_image: string;
  created_at: string;
}

// MongoDB configuration
const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const dbName = 'vaave_digital';

let client: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
  }
  return client;
}

export async function getAllBlogs(): Promise<Blog[]> {
  try {
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(dbName);
    const docs = await db.collection('blogs').find({}).sort({ created_at: -1, createdAt: -1 }).toArray();
    
    if (docs.length > 0) {
      return docs.map(doc => ({
        id: doc.id ? String(doc.id) : doc._id.toString(),
        title: doc.title || '',
        meta_title: doc.meta_title || '',
        meta_description: doc.meta_description || '',
        description: doc.description || '',
        banner_image: doc.banner_image || '',
        created_at: String(doc.created_at || doc.createdAt || new Date().toISOString()),
      }));
    }
    return [];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('Error connecting to MongoDB database:', message);
    return [];
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(dbName);
    
    let query: any = {};
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
    } else {
      // Query by string ID or parsed integer ID (fallback for MySQL / mock IDs)
      const parsedId = parseInt(id, 10);
      query = { $or: [{ id: id }, { id: isNaN(parsedId) ? -1 : parsedId }] };
    }
    
    const doc = await db.collection('blogs').findOne(query);
    if (doc) {
      return {
        id: doc.id ? String(doc.id) : doc._id.toString(),
        title: doc.title || '',
        meta_title: doc.meta_title || '',
        meta_description: doc.meta_description || '',
        description: doc.description || '',
        banner_image: doc.banner_image || '',
        created_at: String(doc.created_at || doc.createdAt || new Date().toISOString()),
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Error querying MongoDB for blog ID ${id}:`, message);
  }
  return null;
}

export async function addBlog(blog: {
  title: string;
  meta_title: string;
  meta_description: string;
  description: string;
  banner_image: string;
}): Promise<boolean> {
  try {
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(dbName);
    const result = await db.collection('blogs').insertOne({
      ...blog,
      created_at: new Date().toISOString(),
    });
    return result.acknowledged;
  } catch (error) {
    console.error('Error adding blog to MongoDB:', error);
    return false;
  }
}

export async function updateBlog(
  id: string,
  blog: {
    title: string;
    meta_title: string;
    meta_description: string;
    description: string;
    banner_image?: string;
  }
): Promise<boolean> {
  try {
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(dbName);
    
    let query: any = {};
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
    } else {
      const parsedId = parseInt(id, 10);
      query = { id: isNaN(parsedId) ? id : parsedId };
    }
    
    const updateDoc: any = {
      $set: {
        title: blog.title,
        meta_title: blog.meta_title,
        meta_description: blog.meta_description,
        description: blog.description,
      }
    };
    if (blog.banner_image) {
      updateDoc.$set.banner_image = blog.banner_image;
    }
    
    const result = await db.collection('blogs').updateOne(query, updateDoc);
    return result.modifiedCount > 0 || result.matchedCount > 0;
  } catch (error) {
    console.error(`Error updating blog ID ${id} in MongoDB:`, error);
    return false;
  }
}

export async function deleteBlog(id: string): Promise<boolean> {
  try {
    const mongoClient = await getMongoClient();
    const db = mongoClient.db(dbName);
    
    let query: any = {};
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
    } else {
      const parsedId = parseInt(id, 10);
      query = { id: isNaN(parsedId) ? id : parsedId };
    }
    
    const result = await db.collection('blogs').deleteOne(query);
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`Error deleting blog ID ${id} from MongoDB:`, error);
    return false;
  }
}
