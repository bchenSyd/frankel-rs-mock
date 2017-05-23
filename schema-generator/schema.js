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

// utility types
    const _distanceType = new GraphQLObjectType({
        name: '_distance',
        fields: {
            metres: { type: GraphQLInt }
        }
    });

    const _prizeType = new GraphQLObjectType({
        name: '_prize',
        fields: {
            type: {
                type: GraphQLString
            },
            value: {
                type: GraphQLString
            }
        }
    })

    /*
    GraphQL serializes Enum values as strings, however internally Enums can be represented by any kind of type, often integers.
    Note: If a value is not provided in a definition, the name of the enum value will be used as it's internal value.
    */
    const _TrackConditionType = new GraphQLEnumType({
        name: "_TrackCondition",
        values: {
            Good: { value: 0 }, // can be of any type
            Heavy: { value: 1 },
            Slow: { value: 2 },
            Synthetic: { value: 3 }
        }
    })
    const TrackConditionType = new GraphQLObjectType({
        name: "TrackCondition",
        fields: () => ({
            expectedCondition: {
                type: _TrackConditionType
            },
            name: {
                type: GraphQLString
            },
            track4CharAbbrev: {
                type: GraphQLString
            },
            condition: {
                type: _TrackConditionType
            }
        })
    });


const MeetingFormType = new GraphQLObjectType({
    name: "MeetingForm",
    fields: {
        date: {
            type: GraphQLString
        },
        railPosition: {
            type: GraphQLString
        },
        tabIndicator: {
            type: GraphQLString
        },
        track: {
            type: new GraphQLObjectType({
                name: '_meetingTrack',
                fields: {
                    name: {
                        type: GraphQLString
                    },
                    state: {
                        type: GraphQLString
                    }
                }
            })
        },
        races: {
            type: new GraphQLList(GraphQLString)
        },
        stage: {
            type: GraphQLString
        },
        formOptions: {
            type: new GraphQLList(GraphQLString)
        }
    }
})

const EventFormType = new GraphQLObjectType({
    name: "EventForm",
    fields: {
        eventId: {
            type: GraphQLInt
        },
        startTime: {
            type: GraphQLString
        },
        distance: {
            type: _distanceType
        },
        restrictions: {
            type: new GraphQLObjectType({
                name: '_restrictions',
                fields: {
                    jockey: {
                        type: GraphQLString
                    }
                }
            })
        },
        weightType: {
            type: GraphQLString
        },
        classes: {
            type: new GraphQLList(GraphQLString)
        },
        prizes: {
            type: new GraphQLList(_prizeType)
        }
    }
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
                type: TrackConditionType
            },
            distance: {
                type: _distanceType
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
        meetingForm:{
            type:MeetingFormType
        },
        eventForm:{
            type:EventFormType
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