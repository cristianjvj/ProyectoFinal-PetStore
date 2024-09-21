import { CommonMethods } from "../../services/common/common.methods";
import { PetBodyBuilder } from "../../services/pet/pet-body.builder";
import { PetMethods } from "../../services/pet/pet.methods";

describe('Find pet', () => {
    it('Find pet by Id - happy path', () => {
        const petId = PetMethods.generatePetId();
        const categoryId = PetMethods.generateCategoryId();
        const category = PetMethods.generateRandomCategory();
        const petName = CommonMethods.generateRandomString();
        const photoUrls = [`https://${CommonMethods.generateRandomString()}.png`]
        const tags = CommonMethods.generateRandomString()
        const status = PetMethods.generateRandomStatus();
        const body = new PetBodyBuilder().setPetId(petId).setCategoryId(categoryId).setCategory(category).setPetName(petName).setPhotoUrls(photoUrls).setTags([tags]).setStatus(status).build()

        cy.log('PRE-CONDITION : Create a pet')
        PetMethods.addPet(body)

        cy.log('Send request "findPetById"')
        PetMethods.getPetById(petId).then(response => {
            expect(response.status).to.eql(200)
            expect(response.body.id).to.equal(petId)
            expect(response.body.category.id).to.equal(categoryId)
            expect(response.body.category.name).to.equal(category)
            expect(response.body.name).to.equal(petName)
            expect(response.body.tags[0].id).to.eql(0)
            expect(response.body.tags[0].name).to.eql(tags)
            expect(response.body.status).to.equal(status)
        })
    })

    it('Find pet in status available', () => {
        const availablePetId = PetMethods.generatePetId()
        const soldPetId = PetMethods.generatePetId()
        const pendingPetId = PetMethods.generatePetId()

        PetMethods.createAvailablePet(availablePetId)
        PetMethods.createSoldPet(soldPetId)
        PetMethods.createPendingPet(pendingPetId)

        PetMethods.getPetsByStatus('available').then(response => {
            expect(response.status).to.equal(200)
            PetMethods.verifyPetsListStatus(response.body, 'available')
            PetMethods.verifyPetIdIncludedInTheList(response.body, availablePetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, soldPetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, pendingPetId)
        })
    })

    it('Find pet in status sold', () => {
        const availablePetId = PetMethods.generatePetId()
        const soldPetId = PetMethods.generatePetId()
        const pendingPetId = PetMethods.generatePetId()

        PetMethods.createAvailablePet(availablePetId)
        PetMethods.createSoldPet(soldPetId)
        PetMethods.createPendingPet(pendingPetId)

        PetMethods.getPetsByStatus('sold').then(response => {
            expect(response.status).to.equal(200)
            PetMethods.verifyPetsListStatus(response.body, 'sold')
            PetMethods.verifyPetIdIncludedInTheList(response.body, soldPetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, availablePetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, pendingPetId)
        })
    })

    it('Find pet in status pending', () => {
        const availablePetId = PetMethods.generatePetId()
        const soldPetId = PetMethods.generatePetId()
        const pendingPetId = PetMethods.generatePetId()

        PetMethods.createAvailablePet(availablePetId)
        PetMethods.createSoldPet(soldPetId)
        PetMethods.createPendingPet(pendingPetId)

        PetMethods.getPetsByStatus('pending').then(response => {
            expect(response.status).to.equal(200)
            PetMethods.verifyPetsListStatus(response.body, 'pending')
            PetMethods.verifyPetIdIncludedInTheList(response.body, pendingPetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, availablePetId)
            PetMethods.verifyPetIdNotIncludedInTheList(response.body, soldPetId)
        })
    })
})