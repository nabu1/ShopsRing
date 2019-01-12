/*
Lista testów e2e:

1) Start > Search > ma wyskoczyć szmatka walidacji 'Brak miasta'

2) Start > Miasto: 'Wwa' > Search > ma wyskoczyć szmatka walidacji 'Brak ulicy'

3) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Search > mają wyskoczyć sklepy w tabeli

4) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Search > mają wyskoczyć sklepy

5) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 > Search > mają wyskoczyć sklepy

6) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 > czek 'Chleb' > Search >
         > mają wyskoczyć sklepy w tabeli, kolumna Chleb i Total

7) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 > czek 'Chleb' i 'Masło' > Search >
         > mają wyskoczyć sklepy w tabeli, kolumna Chleb, Masło i Total

8) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 > czek 'Chleb' i 'Masło' > Search >
         > mają wyskoczyć sklepy w tabeli, kolumna Chleb, Masło i Total
         > unczek Chleb > ma zniknąć kolumna Chleb i zmienić się total

9) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 > czek 'Chleb' i 'Masło' > Search >
         > mają wyskoczyć sklepy w tabeli, kolumna Chleb, Masło i Total
         > unczek Chleb > ma zniknąć kolumna Chleb i zmienić się total
         > klik w Produkty/Reset:
              mają się odczeknąć wszystkie produkty
              mają zniknąć kolumny Masło i Total

10)Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 > czek 'Chleb' i 'Masło' > Search >
         > mają wyskoczyć sklepy w tabeli, kolumna Chleb, Masło i Total
         > unczek Chleb > ma zniknąć kolumna Chleb i zmienić się total
         > klik w Search/Reset:
              mają wyczyścić się wszystkie input boksy kumpa Search
              mają zniknąć wszystkie sklepy z tabeli
              czeknięte czekboksy mają zostać czeknięte

11)Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 > czek 'Chleb' i 'Masło' > Search >
         > mają wyskoczyć sklepy w tabeli, kolumna Chleb, Masło i Total
         > kliknąć w ikonę sortowania:
            sklepiszcze
            adres
            odległość
            total
            chleb masło

            describe('My First Test', () => {
              it('Does not do much', () => {
                expect(true).to.equal(true)
              })
            })
*/

/// <reference types="Cypress" />

describe('Searching shops', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  //cy.pause()

  it('Enter home location and check number of shops returned', () => {
    cy.get('#city')
      .select("Warszawa")
      .get('#street')
      .type('Dolna')
      .get('#streetNumber')
      .type('5a')
      .get('#radius')
      .clear()
      .type(500)
      .get('#search')
      .click()
      .get('#stockTable')
      .find('tbody')
      .find('tr')
      .should('have.length', 3)
  })
})













