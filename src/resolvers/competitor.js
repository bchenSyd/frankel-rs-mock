import { casual } from './utils';
import { MockList } from 'graphql-tools'
import { competitorPriceCode } from './priceCode';

const competitorResolver = (eventId, saddleNumber) => ({
    id: 9000000 + casual.integer(0, 9999),
    name: casual.word,
    eventId,
    eliminated: false,
    jockey: casual.full_name,
    trainer: casual.full_name,
    weight: casual.integer(80, 100) + 'kg',
    lastSixRuns: '1,2,3,4,5,6',
    prices: () => new MockList(5, (parent, args, info) => {
        //FXD-Win SP-WIN, FXD-Place, BT2P
        parent.currentPriceIndex = parent.currentPriceIndex || 0;
        const price = competitorPriceCode[parent.currentPriceIndex];
        parent.currentPriceIndex++;
        return { ...price, price: casual.integer(3, 30) };
    }),
    saddleNumber
});

export default competitorResolver;