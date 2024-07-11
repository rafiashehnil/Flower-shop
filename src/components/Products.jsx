import React from 'react'

const products = [
  {
    id: 1,
    name: 'Red Roses',
    href: '#',
    imageSrc: 'https://images.pexels.com/photos/4825/red-love-romantic-flowers.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    imageAlt: "Rose.",
    price: 'Tk 50',
    //color: 'Black',
  },
  {
    id: 2,
    name: 'Gladiolus',
    href: '#',
    imageSrc: 'https://images.pexels.com/photos/6145089/pexels-photo-6145089.jpeg?auto=compress&cs=tinysrgb&w=600',
    imageAlt: "Gladiolus.",
    price: 'Tk 70',
    //color: 'Black',
  },
  {
    id: 3,
    name: 'Gerbera',
    href: '#',
    imageSrc: 'https://images.pexels.com/photos/2360538/pexels-photo-2360538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1g',
    imageAlt: "Gerbera.",
    price: 'Tk 95',
   // color: 'Black',
  },
  {
    id: 4,
    name: 'Lilium',
    href: '#',
    imageSrc: 'https://media.istockphoto.com/id/505488935/photo/lily-flower.jpg?s=612x612&w=0&k=20&c=rbGoA7pDAuTbjuEEH7dpRYcTWVxWKi1BtMr94BtCwOw=',
    imageAlt: "Lilium.",
    price: 'Tk 300',
    //color: 'Black',
  },
  {
    id: 5,
    name: 'Marigold',
    href: '#',
    imageSrc:'https://images.pexels.com/photos/3524048/pexels-photo-3524048.jpeg',
    imageAlt: "Marigold.",
    price: 'Tk 55',
    //color: 'Black',
  },
  {
    id: 6,
    name: 'Ground Orchid',
    href: '#',
    imageSrc: 'https://images.pexels.com/photos/6192686/pexels-photo-6192686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    imageAlt: "Ground Orchids.",
    price: 'Tk 45',
    //color: 'Black',
  },
  {
    id: 7,
    name: 'Tulip',
    href: '#',
    imageSrc: 'https://images.pexels.com/photos/11369772/pexels-photo-11369772.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    imageAlt: "Tulip.",
    price: 'Tk 95',
   // color: 'Black',
  },
  {
    id: 8,
    name: 'Hydrenzia',
    href: '#',
    imageSrc: 'https://images.pexels.com/photos/5823184/pexels-photo-5823184.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    imageAlt: "Hydrenzia.",
    price: 'Tk 75',
    //color: 'Black',
  },
  {
    id: 9,
    name: 'Lotus',
    href: '#',
    imageSrc: 'https://images.pexels.com/photos/9563912/pexels-photo-9563912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    imageAlt: "Lotus.",
    price: 'Tk 25',
    //color: 'Black',
  },
  {
    id: 10,
    name: 'Carnation',
    href: '#',
    imageSrc: 'https://images.pexels.com/photos/14921001/pexels-photo-14921001.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    imageAlt: "Carnation.",
    price: 'Tk 350',
   // color: 'Black',
  },
]

export default function Example() {
  return (
    <div className="bg-gray">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white-900">Available Flowers</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-white-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-white-900">{product.price}</p>
              </div>
              <button
                    onClick={() => addToCart(product.id)}
                    className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add to Cart
                  </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
