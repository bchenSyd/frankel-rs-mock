import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql';

import { MeetingFormType, EventFormType, CompetitorFormType } from './formTypes'

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        meetingForm: {
            type: MeetingFormType
        },
        eventForm: {
            type: EventFormType
        },
        competitorForm: {
            type: CompetitorFormType
        }
    }
})
const schema = new GraphQLSchema({
    query: QueryType
});

export default schema;