import './App.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment, useEffect, useState } from 'react';

function App() {

  const [battleLog, setBattleLog] = useState([])

  //Fighter 1 

  const [fighterOneName, setFighterOneName] = useState('Elesis')
  const [fighterOneStr, setFighterOneStr] = useState(15)
  const [fighterOneAgi, setFighterOneAgi] = useState(10)
  const [fighterOneVit, setFighterOneVit] = useState(5)
  const [fighterOneTotalPoints, setFighterOneTotalPoints] = useState(fighterOneStr + fighterOneVit + fighterOneAgi)

  //Fighter 2

  const [fighterTwoName, setFighterTwoName] = useState('Satsujinki')
  const [fighterTwoStr, setFighterTwoStr] = useState(5)
  const [fighterTwoAgi, setFighterTwoAgi] = useState(15)
  const [fighterTwoVit, setFighterTwoVit] = useState(10)
  const [fighterTwoTotalPoints, setFighterTwoTotalPoints] = useState(fighterTwoStr + fighterTwoVit + fighterTwoAgi)

  let battleLogArray = []

  function fighter(name, strength, agility, vitality) {
    this.name = name
    this.strength = strength
    this.agility = agility
    this.vitality = vitality

    this.getHp = function () {
      let currentHp = 50 + (this.vitality * 10) + (this.strength * 5) + (this.agility * 3)
      return currentHp
    }

    this.getName = function () {
      return this.name
    }

    this.takeDamage = function (rivalPower, attackerName) {

      this.currentHp = this.currentHp - rivalPower

      if (this.currentHp <= 0) {
        this.currentHp = 0
        battleLogArray.push(`${this.name} New Current HP: ${this.currentHp}`)
        battleLogArray.push("------------------------BATTLE OVER------------------------")
        battleLogArray.push(`The winner is ${attackerName}`)
      } else {
        battleLogArray.push(`${this.name} New Current HP: ${this.currentHp}`)
      }
      setBattleLog(battleLogArray)
    }

    this.dealDamage = function (target) {
      let targetDefense = 10 + (target.agility * 5) + (target.strength * 3) + (target.vitality * 1)
      let damageReduction = Math.trunc((targetDefense - 46) / 3.6)
      let attackPower = 10 + (this.strength * 5) + (this.agility * 3)

      attackPower = Math.trunc(attackPower - ((attackPower * damageReduction) / 100))

      battleLogArray.push(`---------------------------------------------`)
      battleLogArray.push(`${this.name} is dealing (${attackPower}) damage to ${target.name} (${target.currentHp} HP LEFT)`)

      target.takeDamage(attackPower, this.name)
    }

    this.currentHp = this.getHp()
  }

  function fight(fighterOne, fighterTwo) {
    let turn = 1
    while (fighterTwo.currentHp > 0 && fighterOne.currentHp > 0) {
      if (turn === 1) {
        fighterOne.dealDamage(fighterTwo)
        turn = 2
      } else if (turn === 2) {
        fighterTwo.dealDamage(fighterOne)
        turn = 1
      }
    }
  }

  function onClickReset(e) {
    e.preventDefault()
    setBattleLog([])
    setFighterOneName('Elesis')
    setFighterOneStr(15)
    setFighterOneAgi(10)
    setFighterOneVit(5)
    setFighterTwoName('Satsujinki')
    setFighterTwoStr(5)
    setFighterTwoAgi(15)
    setFighterTwoVit(10)
  }

  function submitStats(e) {
    e.preventDefault(e)

    if ((fighterOneTotalPoints <= 30) && (fighterTwoTotalPoints <= 30)) {
      let newFighterOne = new fighter(fighterOneName, fighterOneStr, fighterOneAgi, fighterOneVit)
      let newFighterTwo = new fighter(fighterTwoName, fighterTwoStr, fighterTwoAgi, fighterTwoVit)
      fight(newFighterOne, newFighterTwo)
    }

  }

  useEffect(() => {
    setFighterOneTotalPoints(parseInt(fighterOneStr) + parseInt(fighterOneVit) + parseInt(fighterOneAgi))
    setFighterTwoTotalPoints(parseInt(fighterTwoStr) + parseInt(fighterTwoVit) + parseInt(fighterTwoAgi))
  }, [battleLog, fighterOneName, fighterOneStr, fighterOneAgi, fighterOneVit, fighterTwoName, fighterTwoStr, fighterTwoAgi, fighterTwoVit])

  return (
    <Fragment>
      <Container fluid>
        <Form onSubmit={e => submitStats(e)}>
          <Row>
            <Col className="col-6 mt-5">
              <Row>
                <Col className="col-12">
                  <h1 className="text-center">Fighter 1</h1>
                </Col>

                <Col className="col-12 d-flex justify-content-center">
                  <Form.Group className="mb-3 w-25" controlId="fighterOneName">
                    <Form.Label>Name: </Form.Label>
                    <Form.Control
                      type="text"
                      value={fighterOneName}
                      onChange={(e) => setFighterOneName(e.target.value)}
                      placeholder="Fighter Name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <Form.Group className="mb-3 w-25" controlId="fighterOneStr">
                    <Form.Label>Strength: </Form.Label>
                    <Form.Control
                      type="number"
                      max="30"
                      min="1"
                      value={fighterOneStr}
                      onChange={(e) => setFighterOneStr(e.target.value)}
                      placeholder="Strength"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <Form.Group className="mb-3 w-25" controlId="fighterOneAgi">
                    <Form.Label>Agility: </Form.Label>
                    <Form.Control
                      type="number"
                      max="30"
                      min="1"
                      value={fighterOneAgi}
                      onChange={(e) => setFighterOneAgi(e.target.value)}
                      placeholder="Agility"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <Form.Group className="mb-3 w-25" controlId="fighterOneVit">
                    <Form.Label>Vitality: </Form.Label>
                    <Form.Control
                      type="number"
                      max="30"
                      min="1"
                      value={fighterOneVit}
                      onChange={(e) => setFighterOneVit(e.target.value)}
                      placeholder="Vitality"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <h5 className="text-center">Total Points Allocated: {fighterOneTotalPoints}</h5>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <h5 className="text-center">(Max. 30 points only)</h5>
                </Col>
                {
                  (fighterOneTotalPoints > 30) ?
                    <Col className="col-12 d-flex justify-content-center mt-5">
                      <h1 className="text-danger">{fighterOneName} is exceeding stat points</h1>
                    </Col>
                    :
                    <></>
                }

              </Row>
            </Col>

            <Col className="col-6 mt-5">
              <Row>
                <Col className="col-12">
                  <h1 className="text-center">Fighter 2</h1>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <Form.Group className="mb-3 w-25" controlId="fighterTwoName">
                    <Form.Label>Name: </Form.Label>
                    <Form.Control
                      type="text"
                      value={fighterTwoName}
                      onChange={(e) => setFighterTwoName(e.target.value)}
                      placeholder="Fighter Name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <Form.Group className="mb-3 w-25" controlId="fighterTwoStr">
                    <Form.Label>Strength: </Form.Label>
                    <Form.Control
                      type="number"
                      max="30"
                      min="1"
                      value={fighterTwoStr}
                      onChange={(e) => setFighterTwoStr(e.target.value)}
                      placeholder="Strength"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <Form.Group className="mb-3 w-25" controlId="fighterTwoAgi">
                    <Form.Label>Agility: </Form.Label>
                    <Form.Control
                      type="number"
                      max="30"
                      min="1"
                      value={fighterTwoAgi}
                      onChange={(e) => setFighterTwoAgi(e.target.value)}
                      placeholder="Agility"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <Form.Group className="mb-3 w-25" controlId="fighterTwoVit">
                    <Form.Label>Vitality: </Form.Label>
                    <Form.Control
                      type="number"
                      max="30"
                      min="1"
                      value={fighterTwoVit}
                      onChange={(e) => setFighterTwoVit(e.target.value)}
                      placeholder="Vitality"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <h5 className="text-center">Total Points Allocated: {fighterTwoTotalPoints}</h5>
                </Col>
                <Col className="col-12 d-flex justify-content-center">
                  <h5 className="text-center">(Max. 30 points only)</h5>
                </Col>
                {
                  (fighterTwoTotalPoints > 30) ?
                    <Col className="col-12 d-flex justify-content-center mt-5">
                      <h1 className="text-danger">{fighterTwoName} is exceeding stat points</h1>
                    </Col>
                    :
                    <></>
                }

              </Row>
            </Col>

            <Col className="col-12 d-flex justify-content-center mt-5">
              <Fragment>
                <Button variant="primary" type="submit">SIMULATE BATTLE</Button>
                <Button variant="danger" onClick={e => onClickReset(e)}>RESET</Button>
              </Fragment>
            </Col>
          </Row>
        </Form>
        <Row className="py-5">
          <Col className="col-12">
            <h1 className="text-center">Battle Log</h1>
          </Col>

          {
            (battleLog.length !== 0) ?
              battleLog.map((log, index) => {
                return <Col className="col-12" key={index}><h2 className="text-center">{log}</h2></Col>
              })
              :

              <></>
          }

        </Row>
      </Container>
    </Fragment >
  );
}

export default App;
