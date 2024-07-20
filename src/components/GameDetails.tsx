import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchGameDetails } from '../context/getGames'

const GameDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [game, setGame] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getGameDetails = async () => {
      if (slug) {
        const data = await fetchGameDetails(slug)
        if (data) {
          setGame(data)
          setLoading(false)
        } else {
          setError('Failed to load game details')
          setLoading(false)
        }
      }
    }
    getGameDetails()
  }, [slug])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  const stripHtmlTags = (html: string) => {
    return html.replace(/<\/?[^>]+>/gi, '');
  };

  return (
    <div className="container mx-auto p-4">
      {game && (
        <>
          <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
          <div className="relative">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <a
              href={game.website}
              className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Website
            </a>
          </div>
          <p className="mt-4 text-white">{stripHtmlTags(game.description)}</p>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Metacritic Score</h2>
            <p className="text-lg">{game.metacritic || 'N/A'}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Released</h2>
            <p className="text-lg">{game.released || 'N/A'}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Rating</h2>
            <p className="text-lg">{game.rating} / 5</p>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Platforms</h2>
            <div className="flex flex-wrap">
              {game.platforms.map((platform: any) => (
                <div key={platform.platform.id} className="w-1/2 md:w-1/4 p-2">
                  <img
                    src={platform.platform.image_background}
                    alt={platform.platform.name}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-center mt-2">{platform.platform.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Genres</h2>
            <ul className="list-disc ml-5">
              {game.genres.map((genre: any) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Tags</h2>
            <ul className="list-disc ml-5">
              {game.tags.map((tag: any) => (
                <li key={tag.id}>{tag.name}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Available at</h2>
            <div className="flex flex-wrap">
              {game.stores.map((store: any) => (
                <div key={store.store.id} className="w-1/2 md:w-1/4 p-2">
                  <img
                    src={store.store.image_background}
                    alt={store.store.name}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-center mt-2">
                    <a
                      href={`https://${store.store.domain}`}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {store.store.name}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Requirements</h2>
            <div>
              <h3 className="text-xl font-semibold">Minimum:</h3>
              <p className="text-lg">{game.requirements?.minimum || 'N/A'}</p>
              <h3 className="text-xl font-semibold mt-2">Recommended:</h3>
              <p className="text-lg">{game.requirements?.recommended || 'N/A'}</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">ESRB Rating</h2>
            <p className="text-lg">{game.esrb_rating.name || 'N/A'}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Publisher(s)</h2>
            <div className="flex flex-wrap">
              {game.publishers.map((publisher: any) => (
                <div key={publisher.id} className="w-1/2 md:w-1/4 p-2">
                  <a
                    href={game.website} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={publisher.image_background}
                      alt={publisher.name}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                  </a>
                  <p className="text-center mt-2">{publisher.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default GameDetailPage
