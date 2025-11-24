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
    }
}

