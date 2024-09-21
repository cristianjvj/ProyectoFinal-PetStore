import { CommonData } from "../common/common.data"

export class PetMethods {
    static addPet(body, headers = CommonData.header) {
        return cy.request({
            method: 'POST',
            url: '/pet',
            headers: headers,
            body: body
        })
    }

    static generatePetId() {
        return Math.floor((Math.random() * 3000) + 700);
    }

    static generateCategoryId() {
        return Math.floor((Math.random() * 100) + 0);
    }

    static generateRandomCategory() {
        const arr = ['cats', 'dogs', 'birds', 'rabbits', 'guinea pigs', 'fish']
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        const item = arr[randomIndex];

        return item;
    }

    static generateRandomStatus() {
        const arr = ['available', 'pending', 'sold']
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        const item = arr[randomIndex];

        return item;
    }
}