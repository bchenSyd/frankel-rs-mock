import {
    GraphQLSchema,
    GraphQLEnumType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList
} from 'graphql';

/*
 GraphQL serializes Enum values as strings, however internally Enums can be represented by any kind of type, often integers.
 Note: If a value is not provided in a definition, the name of the enum value will be used as it's internal value.
 */
const TrackConditionType = new GraphQLEnumType({
    name: "TrackCondition",
    values: {
        Good: { value: 0 }, // can be of any type
        Heavy: { value: 1 },
        Slow: { value: 2 },
        Synthetic: { value: 3 }
    }
})
const TrackConditionObjectType = new GraphQLObjectType({
    name: "TrackConditionObject",
    fields: () => ({
        expectedCondition: {
            type: TrackConditionType
        },
        name: {
            type: GraphQLString
        },
        track4CharAbbrev: {
            type: GraphQLString
        },
        condition: {
            type: TrackConditionType
        }
    })
});

const CompetitorFormType = new GraphQLObjectType({
    name: "CompetitorForm",
    fields: () => {
        const _priceType = new GraphQLObjectType({
            name: "_price",
            fields: {
                starting: {
                    type: GraphQLString
                }
            }
        });
        return {
            meetingDate: {
                type: GraphQLString
            },
            track: {
                type: TrackConditionObjectType
            },
            distance: {
                type: new GraphQLObjectType({
                    name: '_distance',
                    fields: {
                        meteres: { type: GraphQLInt }
                    }
                })
            },
            classes: {
                type: new GraphQLList(GraphQLString)
            },
            eventPrizemoney: {
                type: GraphQLString
            },
            starters: {
                type: GraphQLInt
            },
            eventDuration: {
                type: GraphQLString
            },
            jockey: {
                type: new GraphQLObjectType({
                    name: '_jockey',
                    fields: {
                        statistics: {
                            type: new GraphQLList(GraphQLString)
                        },
                        name: {
                            type: GraphQLString
                        }
                    }
                })
            },
            weightCarried: {
                type: GraphQLFloat
            },
            barrier: {
                type: GraphQLString
            },
            prices: {
                type: _priceType
            },
            decimalPrices: {
                type: _priceType
            },
            margin: {
                type: GraphQLString
            },
            otherRunners: {
                type: new GraphQLList(new GraphQLObjectType({
                    name: "_otherRunners",
                    fields: {
                        position: {
                            type: GraphQLString
                        },
                        competitor: {
                            type: GraphQLString
                        }
                    }
                }))
            },
            limitWeight: {
                type: GraphQLFloat
            },
            weightAdj: {
                type: GraphQLFloat
            },
            daysSinceLastRun: {
                type: GraphQLInt
            },
            grade: {
                type: GraphQLString
            },
            winningTime: {
                type: GraphQLString
            },
            pir: {
                type: GraphQLString
            },
            split: {
                type: GraphQLString
            },
            numberOfCompetitors: {
                type: GraphQLString
            },
            raceNumber: {
                type: GraphQLString
            }
        }
    }
})


const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        competitorForm: {
            type: CompetitorFormType
        }
    }
})
const schema = new GraphQLSchema({
    query: QueryType
});

export default schema;