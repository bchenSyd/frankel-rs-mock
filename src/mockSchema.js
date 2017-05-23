import { addMockFunctionsToSchema, MockList } from 'graphql-tools-bchen';
import { graphql, buildClientSchema } from 'graphql';

import casual from 'casual';
import {
    meetingResolver, eventsResolver, eventResolver,
    raceResolver, daysResolver, competitorFormResolver
} from './resolvers';

// step 1: build schema
//*********************************************************************************
//option 1: build schema using graphql defination
// import schemaString from './data/schema.graphql';
// const schema = makeExecutableSchema({ typeDefs: schemaString});

//option 2: build schema using introspection
import * as introspectionResult from './data/schema.json';
const schema = buildClientSchema(introspectionResult.data);
//*********************************************************************************

// step 2: mock implementation
addMockFunctionsToSchema({
    schema,
    mocks: {
        Int: () => casual.integer(1, 10),
        Float: () => casual.double(3, 30).toFixed(1),
        Decimal: () => casual.integer(2, 5),
        Viewer: () => ({
            meetings: () => new MockList([20, 30]),
            events: (parent, args, context) => eventsResolver(parent, args, context),
            races: () => new MockList([12, 16]),
            days: daysResolver()
        }),
        Meeting: () => meetingResolver(),
        Event: (obj, args, context) => {
            let { id } = args;
            return eventResolver(id);
        },
        Race: (obj, args, context) => {
            return raceResolver();
        },
        RacingInterface: (obj, args, context) => {
            const { id } = args;
            const id_type = id.split(':')[0];
            const typename = ['Event', 'Race', 'ScratchingRace'].find(r => r.toLowerCase() === id_type);
            return {
                typename
            }
        },
        
        CompetitorForm: () => competitorFormResolver()
    }
})

// graphql(schema, query).then( result => {
//     console.log('result', result);
// })
export default schema;