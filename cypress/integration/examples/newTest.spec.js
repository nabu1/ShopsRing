/*
Lista testów e2e:


10) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 >
          > czek 'Chleb' i 'Masło' > Search >
          > mają wyskoczyć sklepy w tabeli, kolumna Chleb, Masło i Total
          > unczek Chleb > ma zniknąć kolumna Chleb i zmienić się total
          > klik w Search/Reset:
              mają wyczyścić się wszystkie input boksy kumpa Search
              mają zniknąć wszystkie sklepy z tabeli
              czeknięte czekboksy mają zostać czeknięte



11) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 >
          > czek 'Chleb' i 'Masło' > Search >
          > mają wyskoczyć sklepy w tabeli, kolumna Chleb, Masło i Total
          > kliknąć w ikonę sortowania:
              sklepiszcze
              adres
              odległość
              total
              chleb masło

///////////////////////////////////////////////////////////////////////////////

1) Start > Search > ma wyskoczyć szmatka walidacji 'Brak miasta'

2) Start > Miasto: 'Wwa' > Search > ma wyskoczyć szmatka walidacji 'Brak ulicy'

3) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Search > mają wyskoczyć sklepy w tabeli

4) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Search > mają wyskoczyć sklepy

5) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 > Search > mają wyskoczyć sklepy

6) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' >
         > Radius: 1000 > czek 'Chleb' > Search >
         > mają wyskoczyć sklepy w tabeli, kolumna Chleb i Total
         > unczek Chleb > ma zniknąć kolumna Chleb
         > unczek Maslo > ma zniknąć kolumna Maslo i Total

9) Start > Miasto: 'Wwa' > Ulica: 'Dolna' > Numer domu: '5a' > Radius: 1000 >
         > czek 'Chleb' i 'Masło' > Search >
         > mają wyskoczyć sklepy w tabeli, kolumna Chleb, Masło i Total
         > klik w Produkty/Reset:
             mają się odczeknąć wszystkie produkty
             mają zniknąć kolumny Masło i Total



///////////////////////////////////////////////////////////////////////////////


/*
  describe('Searching shops', () => {
    beforeEach(() => {
      cy.visit('/')
      .get('#city')
      .select("Warszawa")
      .get('#street')
      .type('Dolna')
      .get('#streetNumber')
      .type('5a')
  })

  it('1. Enter Dolna 5a, radius = 100 and test if 1 shop were returned', () => {
    cy.get('#radius')
      .clear()
      .type(100)
      .get('#search')
      .click()
      .get('#stockTable')
      .find('tbody')
      .find('tr')
      .should('have.length', 1)
    })

  it('2. Enter Dolna 5a, radius = 500 and test if 3 shops were returned', () => {
    cy.get('#radius')
    .clear()
      .type(500)
      .get('#search')
      .click()
      .get('#stockTable')
      .find('tbody')
      .find('tr')
      .should('have.length', 3)
  })

  it('3. Enter Dolna 5a, radius = 600 and test if 5 shops were returned', () => {
    cy.get('#radius')
      .clear()
      .type(600)
      .get('#search')
      .click()
      .get('#stockTable')
      .find('tbody')
      .find('tr')
      .should('have.length', 5)
  })

  it('4. Enter Dolna 5a, radius = 800 and test if 9 shops were returned', () => {
    cy.get('#radius')
      .clear()
      .type(800)
      .get('#search')
      .click()
      .get('#stockTable')
      .find('tbody')
      .find('tr')
      .should('have.length', 9)
  })

  it('5. Enter Dolna 5a, radius = 1000 and test if 14 shops were returned', () => {
    cy.get('#radius')
      .clear()
      .type(1000)
      .get('#search')
      .click()
      .get('#stockTable')
      .find('tbody')
      .find('tr')
      .should('have.length', 14)
  })

  it('6. Enter Dolna 5a, radius = 1100 and test if 17 shops were returned', () => {
    cy.get('#radius')
      .clear()
      .type(1100)
      .get('#search')
      .click()
      .get('#stockTable')
      .find('tbody')
      .find('tr')
      .should('have.length', 17)
  })

  it('7. Enter Dolna 5a, radius = 1300 and test if 20 shops were returned', () => {
    cy.get('#radius')
      .clear()
      .type(1300)
      .get('#search')
      .click()
      .get('#stockTable')
      .find('tbody')
      .find('tr')
      .should('have.length', 20)
  })

  it('8. Enter Dolna 5a, radius = 1400 and test if 20 shops were returned', () => {
    cy.get('#radius')
      .clear()
      .type(1400)
      .get('#search')
      .click()
      .get('#stockTable')
      .find('tbody')
      .find('tr')
      .should('have.length', 20)
  })

  it('9. Enter Dolna 5a, radius = 1500 and test if 23 shops were returned', () => {
    cy.get('#radius')
      .clear()
      .type(1500)
      .get('#search')
      .click()
      .get('#stockTable')
      .find('tbody')
      .find('tr')
      .should('have.length', 23)
  })

  it('10. Enter Dolna 5a, radius = 2000 and test if 35 shops were returned', () => {
    cy.get('#radius')
      .clear()
      .type(2000)
      .get('#search')
      .click()
      .get('#stockTable').screenshot()
      .find('tbody')
      .find('tr')
      .should('have.length', 36)
    })
})
*/

describe('Searching shops', () => {
  beforeEach(() => {
    cy.visit('/')
    /*
    .get('#city')
    .select("Warszawa")
    .get('#street')
    .type('Dolna')
    .get('#streetNumber')
    .type('5a')
    */
  })

  it('1. Brak miasta i ulicy, klik w Searcha i ma się wyświetlić modal "Brak miasta"', () => {
    cy.get("[data-test='buttonSearch']")
      .click()
      .get("[data-test='modalCity']")

  })

  it('2. Jest miasto, ale brak ulicy, klik w Searcha i ma wyświetlić się modal "Brak ulicy"', () => {
    cy.get("[data-test='city']")
      .select("Warszawa")

    cy.get("[data-test='buttonSearch']")
      .click()
      .get("[data-test='modalStreet']")

  })

  it('3. Jest ulica ale brak miasta, klik w Searcha i ma wyświetlić się modal "Brak miasta"', () => {
    cy.get("[data-test='street']")
      .type("Dolna 5a")

    cy.contains('Search')
      .click()
      .get("[data-test='modalCity']")

  })
})


describe('Reset buttons', () => {
  beforeEach(() => {
    cy.visit('/')
      .get("[data-test='city']")
      .select("Warszawa")
      .get("[data-test='street']")
      .type("Dolna 5a")
      .get("[data-test='radius']")
      .clear()
      .type(600)
      .get("[data-test='buttonSearch']")
      .click()

    .wait(1000)

      // czeknięcie boksów 'Chleb' i 'Masło'
      .get("[data-test='stocks']")
      .get('#__BVID__19__BV_check_0_opt_')
      .check( { force: true })
      .get('#__BVID__19__BV_check_1_opt_')
      .check( { force: true })
  })

  it('1. Są sklepy (Wwa, Dolna 5a, 600m). Czek w Chleb i Masło wyświetla kolumny Chleb, Maslo i Total.\
         Unczek je zdejmuje', () => {

    // czy nagłówek tabela zawiera słowa 'Total', 'Chleb' lub 'Masło'
    cy.get('#stockTable thead tr th:nth-child(7)')
      .should('have.text', 'Total')
      .get('#stockTable thead tr th:nth-child(8)')
      .should('have.text', 'Chleb')
      .get('#stockTable thead tr th:nth-child(9)')
      .should('have.text', 'Maslo')

      // uncheck boksa Chleb. Znika kolumna 'Chleb' ?
      .get("[data-test='stocks']")
      .get('#__BVID__19__BV_check_0_opt_')
      .uncheck( { force: true })
      .get('#stockTable thead tr th')
      .should('not.exist', 'Total')
      .get('#stockTable thead tr th')
      .should('not.exist', 'Chleb')

      // uncheck boksa Maslo. Znika kolumna 'Maslo' i 'Total' ?
      .get("[data-test='stocks']")
      .get('#__BVID__19__BV_check_1_opt_')
      .uncheck( { force: true })
      .get('#stockTable thead tr th')
      .should('not.exist', 'Total')
      .get('#stockTable thead tr th')
      .should('not.exist', 'Maslo')
      /*
      */

  })

  it.only('2. Są sklepy (Wwa, Dolna 5a, 600m). Czek w Chleb i Masło wyświetla kolumny Chleb, Maslo i Total.\
              Czy klik Reset towarów odczekowuje towary i znika ich kolumny i kolumnę Total ?', () => {

    cy.get("[data-test='buttonResetStock']")
      .wait(2000)
      .click()
      .get('#stockTable thead tr th:nth-child(7)')
      //.get('#stockTable thead tr th')
      .should('not.exist', 'Total')
      .get('#stockTable thead tr th')
      .should('not.exist', 'Chleb')
      .get('#stockTable thead tr th')
      .should('not.exist', 'Maslo')
  })


})








