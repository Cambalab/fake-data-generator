import { expect } from 'chai'
import parseModelData from '../../lib/parse-model'

describe('parseModel processes faker', () => {

  it('date.between - returns a date between 2020-11-03 and 2020-11-05', () => {
    const fromDate = '2020-11-03'
    const toDate = '2020-11-05'
    const model = {
      config: { locale: 'en' },
      model: {
        aDateBetween: {
          type: 'faker',
          value: 'date.between',
          options: [fromDate, toDate]
        }
      }
    }

    const { aDateBetween } = parseModelData(model);

    const aDateBetweenTime = new Date(aDateBetween).getTime()
    const fromDateTime = new Date(fromDate).getTime()
    const toDateTime = new Date(toDate).getTime()

    expect(aDateBetween).to.be.a('date')
    expect(aDateBetweenTime).to.be.within(fromDateTime, toDateTime)
  })
})