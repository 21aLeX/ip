import React, { Component } from 'react'

export default class Api extends Component {


    static async GetCity() {
        try {
            var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
            var token = "df715c00e3b5c040783acc5a353ea078e3e517ac";

            var options = {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                }
            }

            return await fetch(url, options)
                .then(response => response.json())
                .then(result => { return result.location.value }
                )
                .catch(error => console.log("error", error));

        }
        catch (e) {
            return 404
        }
    }


    static async GetIp() {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json; charset=utf-8");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return await fetch("https://ipinfo.io/146.120.247.37?token=b6d639a00844d9", requestOptions)
            .then(response => response.json())
            .then(result => { return result.ip })
            .catch(error => console.log('error', error));
    }


    static async GetStreet(street, city) {
        var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        var token = "df715c00e3b5c040783acc5a353ea078e3e517ac";
        var query = city + ' ' + street;

        var options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({ query: query })
        }
        let arrayAnsver = await fetch(url, options)
            .then(response => response.json())
            .then(result => { return result.suggestions })
            .catch(error => console.log("error", error));
        let arrayStreet = new Array
        for (let i = 0; i < arrayAnsver.length; i++) {
            let street = arrayAnsver[i].data.street
            if (street && !arrayStreet.includes(street)) {
                arrayStreet.push(street)
            }
        }
        return arrayStreet
    }
}
