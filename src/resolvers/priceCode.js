const marketPriceCode = [
    {
        "name": "Win",
        "betTypes": [
            {
                "name": "Win",
                "priceTypes": [
                    {
                        "code": "FXD",
                        "name": "Fixed",
                        "eachWay": true
                    },
                    {
                        "code": "BT3",
                        "name": "Best Tote",
                        "eachWay": true
                    },
                    {
                        "code": "SP",
                        "name": "SP",
                        "eachWay": true
                    },
                ],
                "displayName": "Win"
            }
        ]
    },
    {
        "name": "Place",
        "betTypes": [
            {
                "name": "Place",
                "priceTypes": [
                    {
                        "code": "FXD",
                        "name": "Fixed",
                        "eachWay": false
                    },
                    {
                        "code": "BT2P",
                        "name": "Mid Tote",
                        "eachWay": false
                    }
                ],
                "displayName": "Place"
            }
        ]
    },
    {
        "name": "Exotics",
        "betTypes": [
            {
                "name": "Quinella",
                "priceTypes": [
                    {
                        "code": null,
                        "name": null,
                        "eachWay": null
                    }
                ],
                "displayName": "Quinella"
            },
            {
                "name": "Exacta",
                "priceTypes": [
                    {
                        "code": null,
                        "name": null,
                        "eachWay": null
                    }
                ],
                "displayName": "Exacta"
            },
            {
                "name": "Trifecta",
                "priceTypes": [
                    {
                        "code": null,
                        "name": null,
                        "eachWay": null
                    }
                ],
                "displayName": "Trifecta"
            },
            {
                "name": "FirstFour",
                "priceTypes": [
                    {
                        "code": null,
                        "name": null,
                        "eachWay": null
                    }
                ],
                "displayName": "First Four"
            },
            {
                "name": "Quadrella",
                "priceTypes": [
                    {
                        "code": null,
                        "name": null,
                        "eachWay": null
                    }
                ],
                "displayName": "Quadrella"
            }
        ]
    }
];

const competitorPriceCode = [{
    code: 'FXD',
    betType: 'Win'
}, {
    code: 'BT3',
    betType: 'Win'
}, {
    code: 'SP',
    betType: 'Win'
}, {
    code: 'FXD',
    betType: 'Place'
}, {
    code: 'BT2P',
    betType: 'Place'
}];

export {
    marketPriceCode,
    competitorPriceCode
}