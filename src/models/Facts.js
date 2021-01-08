import $ from 'jquery';

class Facts {
    constructor(count = 10) {
            this.count = count
    }
    count = 10;
    URL_RANDOM_FACTS = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=';
    URL_FACT = 'https://cat-fact.herokuapp.com/facts/';
   fetchRandomFacts = async (id) => {
        const promise = new Promise((resolve, reject) => {
            let url = this.URL_RANDOM_FACTS + this.count;

            if (id) {
                url = this.URL_FACT + id
            }
            $.ajax({
                url: url,
                method: "GET",
                contentType: "application/json",
                success(result) {
                    resolve(result);
                },
                error(result) {
                    reject(result);
                }

            })
        });
        let res = await promise;
        return res;
    }
}

export default Facts;