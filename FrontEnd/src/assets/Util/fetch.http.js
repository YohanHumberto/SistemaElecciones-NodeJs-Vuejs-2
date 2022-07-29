const dominio = "http://localhost:3001";

const GetData = async (url) => {

    try {

        let res = await fetch(dominio + url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        let data = await res.json();

        console.log(data);
        return data;

    } catch (error) {
        console.log(error);
        return error;
    }

}

const PostData = async (url, datos) => {

    try {

        let res = await fetch(dominio + url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(datos),
        })

        let data = await res.json();

        console.log(data);

        return data;

    } catch (error) {
        console.log(error);
        return error;
    }

}

const PostDataWithAutorization = async (url, datos) => {

    try {

        let res = await fetch(dominio + url, {
            headers: {
                "Content-Type": "application/json",
                authorization: sessionStorage.getItem("token")
            },
            method: "POST",
            body: JSON.stringify(datos),
        })

        let data = await res.json();

        console.log(data);

        return data;

    } catch (error) {
        console.log(error);
        return error;
    }

}

const GetDataWithAutorization = async (url) => {

    try {

        let res = await fetch(dominio + url, {
            headers: {
                "Content-Type": "application/json",
                authorization: sessionStorage.getItem("token")
            },
        });

        let data = await res.json();

        console.log(data);
        return data;

    } catch (error) {
        console.log(eerrorrr);
        return error;
    }

}

export default { GetData, PostData, PostDataWithAutorization, GetDataWithAutorization }