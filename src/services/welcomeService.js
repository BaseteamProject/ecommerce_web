import { welcomeRepository } from '../repositories/welcomeRepository.js'

export async function fetchWelcomeData() {
  try {
    const welcome = await welcomeRepository.getWelcomeData();

    return welcome.map(welcome => ({
      ...welcome,
      header: welcome.header,
      deskripsiWel: welcome.description,
      imageUrl: welcome.image
    }));
  } catch (err) {
    console.error('Error fetching welcome data:', err);
    throw new Error('Gagal memuat welcome data');
  }
}

export async function fetchCardsData() {
  try {
    const cards = await welcomeRepository.getCardsData();

    return cards.map(card => ({
      ...card,
      title: card.title,
      description: card.description
    }));
  } catch (err) {
    console.error('Error fetching cards data:', err);
    throw new Error('Gagal memuat cards data');
  }
}
