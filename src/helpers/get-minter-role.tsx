import sha3  from 'js-sha3'

export default () => {
  return sha3.keccak256('MINTER_ROLE')
}