import React from 'react'
import { useHistory } from 'react-router-dom'
import ArrowLeftLineIcon from 'remixicon-react/ArrowLeftLineIcon'

const AboutUs = () => {
  const history = useHistory()

  return (
    <div className="container">
      <div className="right-container">
        <ArrowLeftLineIcon
          className="au-back"
          onClick={() => history.goBack()}
        />
        <div className="au-panel">
          <h1 className="au-title">About Us</h1>
          <div className="au-content">
            <p>
              The Damilag Dog Impounding started operations January 17, 2018
            </p>
            <p>
              The Damilag dog Impounding is under the supervision of the
              Committee on Agriculture and the Environment, headed by Hon.
              Anthony Ganas Inihao, Supervised by Punong Barangay Allan G.
              Torres Jr. and Richard Duietes DVM ( Municipal Veterinarian)
            </p>
            <p>
              The Damilag Dog Impounding is guided by the provisions of
              Municipal Ordinance 2019-1255 Article A or the Anti Rabies Control
              Ordinance of Manolo Fortich.
            </p>
            <p>
              The Damilag dog impounding follows R.A. 8485 and humanely as
              possible treats impounded dogs and open adoption partnering with
              CD pet adopt for adoption of impounded dogs while being able to
              follow the provisions of MO 2019-1255.
            </p>
            <p>
              The Damilag dog impounding are handled by trained dog catchers,
              using nets and techniques to not harm the dog when catching. The
              DDI trailer was built to be mobile so stress on dogs will be
              minimal. Dogs on the DDI are fed with premium Dog Food and is
              cared for by the following Barangay Animal Health Workers:
            </p>
            <ul>
              <li>Reynaldo Sarmiento - BAHW/ DRIVER/ CATCHER/ VACCINATOR</li>
              <li>
                Rita Jacutin - RECORDS/ DOCUMENTATION/ CATCHER/ VACCINATOR
              </li>
              <li>JoMarie Roloma - BAHW CATCHER/ FEEDER/ CLEANER</li>
              <li>Carlito Licuanan - BAHW CATCHER/ FEEDER/ CLEANER</li>
              <li>Efren Paler - BAHW/CATCHER</li>
              <li>Crisansel Floren - Coordinator</li>
              <li>Contact Number: 09553144476</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
