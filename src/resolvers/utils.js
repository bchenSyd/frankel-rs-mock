import casual from 'casual';
import moment from 'moment';

casual.define('priceCode', () => {
    return casual.random_element(['FXD', 'FXD', 'FXD', 'FXD', 'FXD',
        'BT3', 'BT2', 'BT2P']);
})

casual.define('eventIdentifier', eventId => {
    // event($id:11223344) or node(id:"event:11223344")
    let id = eventId || casual.integer(115300, 125399);
    if (typeof id === 'string' && id.lastIndexOf('event:') !== -1) {
        id = id.split('event:')[1]
    }
    return {
        id: 'event:' + id,
        origId: '' + id
    }
});
casual.define('raceIdentifier', () => {
    const id = casual.integer(115300, 125399);
    return {
        id: 'race:' + id,
        origId: '' + id
    }
});

casual.define('meetingName', () => casual.random_element(['Goulburn', 'Mildura', 'Gosford', 'Richmond', 'Kembla Granage', 'Muswellbrook',
    'Rockhampton', 'Seymour', 'Albion Park', 'Glocester Park', 'Menangle', 'Newcastle', 'Swan Hill', 'Devonport', 'Gawler', 'Geelong',
    'Ipswich', 'Townsville', 'Warragul', 'Redcliffe', 'terang'
]))
casual.define('country', () => {
    // 'eng-ire-sco-wal', 'aus', 'saf', 'usa', 'can', 'fra', 'uae', 'hk', 'jap', 'sin', 'nz', 'swe', 'deu', 'chi', 'ury', 'arg', 'ita', 'kor'
    return casual.random_element([
        { code: 'aus', name: 'Australia' },
        { code: 'aus', name: 'Australia' },
        { code: 'aus', name: 'Australia' },
        { code: 'aus', name: 'Australia' },
        { code: 'aus', name: 'Australia' },
        { code: 'aus', name: 'Australia' },
        { code: 'aus', name: 'Australia' },
        { code: 'can', name: 'Canada' },
        { code: 'saf', name: 'South Africa' },
        { code: 'fra', name: 'France' },
        { code: 'hk', name: 'HongKong' },
        { code: 'jap', name: 'Japan' },
        { code: 'sin', name: 'Singapore' },
        { code: 'chi', name: 'Chily' },
        { code: 'eng-ire-sco-wal', name: 'UK & Ireland' }
    ]);
});

casual.define('eventStatus', () => casual.random_element(Array.from(Array(20), (x, index) => {
    if (index % 20 === 1) {
        return 'closed'
    } else if (index % 20 === 2) {
        return 'finalized'
    }
    return 'open6'
})));

casual.define('outcomeDateString', () => moment().add(casual.integer(0, 60 * 24 * 2), 'minutes').format())

export { casual } 