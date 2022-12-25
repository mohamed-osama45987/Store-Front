import { User } from '../../models/user'

describe('User Model tests', () => {
  it('user model should have the correct methods to be defined', () => {
    expect(User.indexAllUsers).toBeDefined()
    expect(User.showOneUser).toBeDefined()
    expect(User.createUser).toBeDefined()
  })

  it('indexAllUsers method must return a list of users', async () => {
    const result = await User.indexAllUsers()

    expect(result).not.toHaveSize(0)
    expect(result[0].id).toBeDefined()
    expect(result[0].firstname).toBeDefined()
    expect(result[0].lastname).toBeDefined()
    expect(result[0].password).toBeDefined()
  })

  it('showOneUser method must return one user object', async () => {
    const result = await User.showOneUser('testfirstname', 'testlastname')

    expect(result.id).toBeDefined()
    expect(result.firstname).toBeDefined()
    expect(result.lastname).toBeDefined()
    expect(result.password).toBeDefined()
  })

  it('createUser method must return the created user object', async () => {
    const result = await User.createUser('testUserFirstName', 'testUserLastName', 'somehasedpass')

    expect(result).not.toHaveSize(0)
    expect(result.id).toBeDefined()
    expect(result.firstname).toBeDefined()
    expect(result.lastname).toBeDefined()
    expect(result.password).toBeDefined()
  })

  it('createUser method must return the created user object', async () => {
    const result = await User.authenticate('testUserFirstName', 'testUserLastName')

    expect(result).not.toHaveSize(0)
    expect(result.id).toBeDefined()
    expect(result.firstname).toBeDefined()
    expect(result.lastname).toBeDefined()
    expect(result.password).toBeDefined()
  })
})
