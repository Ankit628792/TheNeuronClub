import { sanityClient, urlFor } from "../../sanity";
import PortableText from 'react-portable-text'


const Post = ({ post }) => {
    return <main className="text-white">
        <img className="h-96 object-contain w-full" src={urlFor(post.mainImage)?.url()} alt="" />
        <article className="max-w-3xl mx-auto p-5">
            <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
            <p className="tet-xl font-light text-gray-600 mb-2">{post.description}</p>

            <div className="flex items-center space-x-2">
                <img className="h-10 w-10 rounded-full" src={urlFor(post.author.image)?.url()} alt="" />
                <p className="text-sm font-extralight">Blog post by <span className="text-green-600">{post.author.name}</span> - Published at {new Date(post._createdAt).toDateString()}, {new Date(post._createdAt).toLocaleTimeString()}</p>
            </div>

            <div className="mt-10">
                <PortableText
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    content={post.body}
                    serializers={{
                        h1: (props) => <h1 className="text-2xl font-bold my-5" {...props} />,
                        h2: (props) => <h1 className="text-xl font-bold my-5" {...props} />,
                        h3: (props) => <h1 className="text-lg font-bold my-5" {...props} />,
                        li: ({ children }) => <li className="ml-4 list-disc"> {children} </li>,
                        link: ({ href, children }) => <a href={href} className="text-blue-500 hover:underline"> {children} </a>,
                    }
                    }
                />
            </div>
        </article>

    </main>;
};

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == 'post']{
        _id,
        slug{
            current
        }
    }`
    const posts = await sanityClient.fetch(query);
    const paths = posts.map((post) => ({
        params: {
            slug: post.slug.current
        }
    }))
    return {
        paths, fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params }) => {
    const query = `*[_type == 'post' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
          name,
          image
        },
        description,
        mainImage,
        slug,
        body
      }`
    const post = await sanityClient.fetch(query, {
        slug: params?.slug
    })
    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            post
        },
        revalidate: 60
    }
}
