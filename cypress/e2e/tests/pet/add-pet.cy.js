import { CommonData } from "../../services/common/common.data"

describe('Add pet', ()=>{
    it('Add pet - happy path', ()=>{
      cy.request({
        method: 'POST',
        url: '/pet',
        headers: CommonData.header,
        body: {
            "id": 7,
            "category": {
              "id": 2,
              "name": "birds"
            },
            "name": "happy piolin",
            "photoUrls": [
              "https://my-photo.jpg"
            ],
            "tags": [
              {
                "id": 6,
                "name": "cute"
              }
            ],
            "status": "sold"
          }
    }).then(response => {
        cy.log(JSON.stringify(response))
    })
    cy.wait(15000)
})
})