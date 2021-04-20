Por conta de algumas funcionalidades de estilização recomendo o uso da versão mais recente edge, brave ou chrome.


- Consumindo api utilizando SPA:
```bash

useEffect(()=> {
fetch('url')
.then(response => response.json())
.then(data => console.log(data))
}, [])

```

- Consumindo api utilizando SSR:

>Dentro de qualquer arquivo da página pages, exportar uma function async getServerSideProps:

```bash

export async function getServerSideProps() {
    const response = await fetch ('url')
    const data = await response.json()

    return {
        props: {
            dados: dados,
        }
    }
}

```

- Consumindo api utilizando SSG:

>Bem parecido com SSR, basta mudar nome da function e adicionar o revalidate.

```bash

export async function getStaticProps() {
    const response = await fetch ('url')
    const data = await response.json()

    return {
        props: {
            dados: dados,
        },
        revalidate: 60 * 60 * 8,
    }
}

```
