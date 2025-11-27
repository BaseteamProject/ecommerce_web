export const welcomeRepository = {
    async getWelcomeData() {
        return [
            {
                header: 'Module 1',
                description: 'Description for Module 1',
                image: 'https://example.com/module1.jpg',
            },
            {
                header: 'Module 2',
                description: 'Description for Module 2',
                image: 'https://example.com/module2.jpg',
            }
        ]
    },
    async getCardsData() {
        return [
            {
                title: 'Card 1',
                content: 'Content for Card 1',
                image: 'https://example.com/card1.jpg',
            },
            {
                title: 'Card 2',
                content: 'Content for Card 2',
                image: 'https://example.com/card2.jpg',
            },
            {
                title: 'Card 3',
                content: 'Content for Card 3',
                image: 'https://example.com/card3.jpg',
            }
        ]
    }
}

