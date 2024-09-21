import { CommonData } from "../../services/common/common.data";
import { CommonMethods } from "../../services/common/common.methods";
import { PetBodyBuilder } from "../../services/pet/pet-body.builder";
import { PetMethods } from "../../services/pet/pet.methods";

describe("Add pet", () => {
  const petId = PetMethods.generatePetId();
  const categoryId = PetMethods.generateCategoryId();
  const category = PetMethods.generateRandomCategory();
  const petName = CommonMethods.generateRandomString();
  const photoUrls = [`https://${CommonMethods.generateRandomString()}.png`]
  const tags = CommonMethods.generateRandomString()
  const status = PetMethods.generateRandomStatus();

  const petbody = new PetBodyBuilder()
    .setPetId(petId)
    .setCategoryId(categoryId)
    .setCategory(category)
    .setPetName(petName)
    .setPhotoUrls(photoUrls)
    .setTags([tags])
    .setStatus(status)
    .build();
  it("Add pet - happy path", () => {
    PetMethods.addPet(petbody).then((response) => {
      expect(response.status).to.eql(200)
      expect(response.body.id).to.equal(petId)
      expect(response.body.category.id).to.equal(categoryId)
      expect(response.body.category.name).to.equal(category)
      expect(response.body.name).to.equal(petName)
      expect(response.body.tags[0].id).to.eql(0)
      expect(response.body.tags[0].name).to.eql(tags)
      expect(response.body.status).to.equal(status)
    });
  });
});