const Mockaroo = require('mockaroo');

class MockarooManager {

    #mockarooClient;
    #generate;
    #schema;
    
    constructor(generate, schema) {
        this.#generate = generate;
        this.#schema = schema;
        this.#mockarooClient = new Mockaroo.Client({
            apiKey: this.#schema.key
        });
    }

    async generareDataPool() {
        return this.#mockarooClient.generate({
            count: this.#generate,
            schema: this.#schema.name
        }).then(data => { return data; });
    }
}

const SCHEMAS = {
    articlesPositive: {key: '0c346df0', name: 'editor_positive'},
    articlesNegative: {key: '0c346df0', name: 'editor_negative'}
};

export{MockarooManager, SCHEMAS};