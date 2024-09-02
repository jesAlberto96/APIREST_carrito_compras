export const seedData = {
    type_items: [
      { name: 'Productos', code: 'producto'},
      { name: 'Evento', code: 'evento'},
    ],
    status_shopping_cart: [
      { name: 'Pendiente', code: 'pendiente'},
      { name: 'Cancelado', code: 'cancelado'},
      { name: 'Pagado', code: 'pagado'},
    ],
    items: [
      { name: 'Concierto de Metallica', stock: 100, description: 'Este concierto va estar buenísimo', price: 140000 },
      { name: 'Zapatos', stock: 10, description: 'Zapatos de buena calidad', price: 60000 },
      { name: 'Gorra', stock: 8, description: 'Gorra de buena calidad', price: 10000 },
      { name: 'Camisa negra', stock: 6, description: 'Camisa con la mejor tela', price: 20000 },
      { name: 'Show de comedia', stock: 5, description: 'Te vas a reir mucho, ven pronto', price: 85000 },
      { name: 'PC Gamer', stock: 10, description: 'Lo áltimo en tecnología', price: 1000000 },
    ]
}