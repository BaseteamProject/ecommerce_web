export const welcomeRepository = {
    async getWelcomeData() {
        return [
            {
                header: 'Module 1',
                description: 'Description for Module 1',
            }
        ]
    },
    async getCardsData() {
        return [
            {
                title: 'Card 1',
                description: 'Description for Card 1',
            }, {
                title: 'Card 2',
                description: 'Description for Card 2',
            }, {
                title: 'Card 3',
                description: 'Description for Card 3',
            }
        ]
    },

}

