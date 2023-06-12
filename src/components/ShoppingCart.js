import { useState, useEffect } from "react";

function ShoppingCart () {
    console.log("RE-RENDER")
    const [form, setForm] = useState(JSON.parse(localStorage.getItem('form')) || {
        name: '',
        birth_year: '',
        hair_color: '',
        skin_color: '',
        height: '',
        mass: '',
    } );
    
    useEffect(() => {
        fetch('https://swapi.dev/api/people/1')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setForm(prev => {
                const temp = {...prev}
                temp.name = data.name
                temp.birth_year = data.birth_year
                temp.hair_color = data.hair_color
                temp.skin_color = data.skin_color
                temp.height = data.height
                temp.mass = data.mass

                return temp
            })
        }) 
    }, [])
    
    const inputHandler = e => {
        const { value, name } = e.target;

        setForm(prev => {
            let temp = {...prev};
            temp[name] = value
            localStorage.setItem('form', JSON.stringify(temp))
            return temp
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const question = prompt('Who is next?');
        if(question !== '' || question !== null) {
            console.log(form)
        }
    }

    const clear = (e) => {
        e.preventDefault();
        setForm(prev => {
            return {
                name: '',
                birth_year: '',
                hair_color: '',
                skin_color: '',
                height: '',
                mass: '',
            }
        })
        localStorage.removeItem('form')
    }

    return (
            
        <div className="wrapper">
            <div className="container">
                <div className="form">  
                    <input value={form.name} name="name"  onChange={e => {inputHandler(e)}} type="text" placeholder="Name" /> 
                    <input value={form.birth_year} name="birth_year" onChange={e => {inputHandler(e)}} type="text" placeholder="Birth year" /> 
                    <input value={form.hair_color} name="hair_color" onChange={e => {inputHandler(e)}} type="text" placeholder="Hair color" /> 
                    <input value={form.skin_color} name="skin_color" onChange={e => {inputHandler(e)}} type="text" placeholder="Skin color" /> 
                    <input value={form.height} name="height" onChange={e => {inputHandler(e)}} type="text" placeholder="Height" />
                    <input value={form.mass} name="mass" onChange={e => {inputHandler(e)}} type="text" placeholder="Mass" />
                    <button onClick={submitHandler}>Send</button>
                    <button onClick={clear}>Clear</button>
                </div>
 
                <div className="output">
                    <div className="output-line">
                        <span className="label">Name : </span>
                        <span className="nameData">{form.name}</span>
                    </div>

                    <div className="output-line">
                        <span className="label">Birth year : </span>
                        <span className="nameData">{form.birth_year}</span>
                    </div>

                    <div className="output-line">
                        <span className="label">Hair color : </span>
                        <span className="nameData">{form.hair_color}</span>
                    </div>

                    <div className="output-line">
                        <span className="label">Skin color : </span>
                        <span className="nameData">{form.skin_color}</span>
                    </div>
                    <div className="output-line">
                        <span className="label">Height : </span>
                        <span className="nameData">{form.height}</span>
                    </div>
                    <div className="output-line">
                        <span className="label">Mass : </span>
                        <span className="nameData">{form.mass}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;