const backPathUrl = () => {
    return window.location.pathname.split('/')[3] ?
        `${window.location.pathname.split('/')[1]}/${window.location.pathname.split('/')[2]}` :
        window.location.pathname.split('/')[1]
}

export default backPathUrl