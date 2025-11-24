import { welcomeRepository } from '../repositories/welcomeRepository.js'

export async function fetchWelcomeData() {
  try {
    const data = await welcomeRepository.getWelcomeData();

    return data.map(welcome => ({
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