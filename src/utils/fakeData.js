const faker = require("faker");

export const fakeRecord = (index) => {
    return {
        id: index,
        avatar: faker.image.avatar(),
        city: faker.address.city(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        street: faker.address.streetName(),
        zipCode: faker.address.zipCode(),
        date: faker.date.past(),
        companyName: faker.company.companyName(),
        bs: faker.company.bs(),
        catchPhrase: faker.company.catchPhrase(),
        words: faker.lorem.words(),
        sentence: faker.lorem.sentence(),
    };
};


export const fakeData = (count = 100) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(fakeRecord(i))
    }
    return data
};