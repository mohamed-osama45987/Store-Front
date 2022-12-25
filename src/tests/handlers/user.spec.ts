import supertest from 'supertest'
import app from '../../index'

// create a request object
const request = supertest(app)

const token = 'eyJhbGciOiJIUzI1NiJ9.Mw.P2O5Rrj4q4BQX_aWsE0tCc6kEr7SiwY8sz2VQwEoAxo'

describe('User handlers tests', () => {
  it('/users/api/authenticate should return a token when a user is created', async () => {
    const response = await request
      .post('/api/users/authenticate')
      .send({ firstname: 'testfirstname', lastname: 'testlastname', password: '1234' })

    expect(response.status).toBe(200)
    expect(response.body.token).toBeDefined()
    expect(response.body.user).toBeDefined()
  })
  it('/users/api/createuser should return a token when a user is created', async () => {
    const response = await request
      .post('/api/users/createuser')
      .set('Authorization', token)
      .send({ firstname: 'testuser2', lastname: 'testuser2', password: '1234' })

    expect(response.status).toBe(200)
    expect(response.body.token).toBeDefined()
  })

  it('/users/api/index should return a list of users when we provide valid token', async () => {
    const response = await request.get('/api/users/index').set('Authorization', token)

    expect(response.status).toBe(200)
    expect(response.body.users).toBeDefined()
    expect(response.body.users.length).toBeGreaterThan(0)
    expect(response.body.users[0].id).toBeDefined()
    expect(response.body.users[0].firstname).toBeDefined()
    expect(response.body.users[0].lastname).toBeDefined()
    expect(response.body.users[0].password).toBeDefined()
  })

  it('/users/api/show should return a user object when we provide valid token and valid firstname, lastname', async () => {
    const response = await request
      .get('/api/users/show')
      .set('Authorization', token)
      .query({ firstname: 'testuser2', lastname: 'testuser2' })

    expect(response.status).toBe(200)
    expect(response.body.user).toBeDefined()
    expect(response.body.user.id).toBeDefined()
    expect(response.body.user.firstname).toBeDefined()
    expect(response.body.user.lastname).toBeDefined()
    expect(response.body.user.password).toBeDefined()
  })
})
