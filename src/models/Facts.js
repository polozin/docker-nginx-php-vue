"use strict";
import $ from 'jquery';

class Facts {
    constructor(count = 10) {
            this.count = count
    }
    count = 10;
    URL_RANDOM_FACTS = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=';
    URL_FACT = 'https://cat-fact.herokuapp.com/facts/';
    URL_LOCAL = '/handler.php';
    fetchLocal = async  () => {
        const promise = new Promise((resolve, reject) =>{
            let url = this.URL_LOCAL + '?type=facts';
            $.ajax({
                url: url,
                method: "GET",
                contentType: "application/json; charset=UTF-8",
                success(result) {
                    resolve(result);
                },
                error(result) {
                    console.error(result);
                    reject(result);
                }
            })
        });
        let res = await promise;
        return res;
    }
    save = async (payload) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.URL_LOCAL,
                method: "POST",
                contentType: "application/json; charset=UTF-8",
                data: 'type=facts&payload=' + JSON.stringify(payload),
                success(result) {
                    resolve(result);
                },
                error(result) {
                    console.error(result);
                    reject(result);
                }
            })
        });
    }
    fetchRandomFacts = async (id) => {
        const promise = new Promise((resolve, reject) => {
            let url = this.URL_RANDOM_FACTS + this.count;

            if (id) {
                url = this.URL_FACT + id
            }
            $.ajax({
                url: url,
                method: "GET",
                contentType: "application/json; charset=UTF-8",
                success(result) {
                    resolve(result);
                },
                error(result) {
                    console.error(result);
                    reject(result);
                }

            })
        });
        let res = await promise;
        return res;
    }
}

export default Facts;