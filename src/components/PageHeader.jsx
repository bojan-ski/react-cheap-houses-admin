const PageHeader = ({ title }) => {
    return (
        <div className='container'>
            <h2 className='capitalize fw-bold text-center mb-4'>
                {title}
            </h2>
        </div>
    )
}

export default PageHeader