import casual from 'casual';
import moment from 'moment';

casual.define('priceCode', () => {
    return casual.random_element(['FXD', 'FXD', 'FXD', 'FXD', 'FXD',
        'BT3', 'BT2', 'BT2P']);
})

casual.define('eventIdentifier', eventId => {
    let id = eventId || casual.integer(115300, 115399);
    if (eventId.lastIndexOf('event:') === -1) {
        id = "event:" + id;
    }
    return {
        id,
        origId: '' + id
    }
});
casual.define('raceIdentifier', () => {
    const id = casual.integer(115300, 115399);
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

casual.define('eventStatus', () => casual.random_element(['open2', 'open5', 'open6', 'closed', 'finalised']));

casual.define('outcomeDateString', () => moment().add(casual.integer(0, 60 * 24 * 2), 'minutes').format())

export { casual } 