import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

export default function DevForm({ onSubmit }) {

  async function handleSubmit(e) {
    e.preventDefault()

     await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    })

    setGitUser('')
    setTechs('')
  }

  useEffect(() => { navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      setLatitude(latitude)
      setLongitude(longitude)
    },
    (erro) => { console.log(erro) },
    { timeout: 30000 }
  ) }, [])

  const [ latitude, setLatitude ] = useState('')
  const [ longitude, setLongitude ] = useState('')

  const [ github_username, setGitUser ] = useState('')
  const [ techs, setTechs ] = useState('')

  return (
    <form onSubmit={handleSubmit}>
        <div className="input-block">
        <label htmlFor="github_username">Usuário do github</label>
        <input value={github_username} onChange={(e) => setGitUser(e.target.value)} name="github_username" id="github_username" required/>
        </div>

        <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input value={techs} onChange={(e) => setTechs(e.target.value)} name="techs" id="techs" required/>
        </div>

        <div className="input-group">
        <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input type="number" name="latitude" id="latitude" onChange={(e) => { setLatitude(e.target.value) }} required value={latitude}/>
        </div>

        <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input type="number" name="longitude" id="longitude" onChange={(e) => { setLongitude(e.target.value) }} required value={longitude}/>
        </div>
        </div>
        <button type="submit">Salvar</button>
    </form>
  );
}
