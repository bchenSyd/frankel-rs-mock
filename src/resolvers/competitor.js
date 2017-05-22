import { casual } from './utils';
import { MockList } from 'graphql-tools'

const competitorResolver = (eventId, saddleNumber) => ({
    id: 9000000 + casual.integer(0, 9999),
    name: casual.word,
    eventId,
    eliminated: false,
    jockey: casual.full_name,
    trainer: casual.full_name,
    weight: casual.integer(80, 100) + 'kg',
    lastSixRuns: '1,2,3,4,5,6',
    prices: () => new MockList([2, 4], () => {
        return new priceResolver();
    }), 
    saddleNumber
});

const priceResolver = () => ({
    code: casual.priceCode,
    betType: casual.random_element(['Win','Place'])
});

export {
    competitorResolver,
    priceResolver
}