/*
/////////////////////////////////////////////////
////                                         ////
//// MIGRATIONS FOR PRODUCTION: CORE UPGRADE ////
////                                         ////
/////////////////////////////////////////////////
*/

const LibPosition = artifacts.require('LibPosition')

const Registry = artifacts.require('Registry')
const Core = artifacts.require('Core')
const TokenMinter = artifacts.require('TokenMinter')

const Match = artifacts.require('Match')
const SwaprateMatch = artifacts.require('SwaprateMatch')

const baseTokenURI = 'https://explorer.opium.network/erc721o/'
let governor = '0xF80D12E55F6cdA587a26a05f2e6477054e8255e5'

const libPositionAddress = '0x56c54b408c44B12f6c9219C9c73Fcda4E783FC20'
const oracleAggregatorAddress = '0xB69890912E40A7849fCA058bb118Cfe7d70932c4'
const syntheticAggregatorAddress = '0x3a943C50Bcde3E357916ce6E109626213Fd36105'
const tokenSpenderAddress = '0x8bd75f96EfA089aEcf6Ac4CD0B671e2428f4B2af'

// DEPLOYED
const registryAddress = '0x0800c19ecec5712040a77e19f27d1c44c47ee174'
const coreAddress = '0xa809d9d82a59166a61b86b7b89feb9c47739a3e1'
const tokenMinterAddress = '0x212fe617ba1641cc84302687a4fbc83f13584a8b'
const matchingAddress = '0x5209772c60a51425b304d74fe4551184044d5dfa'
const swaprateMatchingAddress = '0x2124e2f1460422c247f195cabe6909304c4e6230'

// Deployment functions
const deployAndLinkLibPosition = async ({ deployer }) => {
    /**
     * To add existing library:
     * 1) Compile it
     * 2) Add this to compiledJson.network
      
      "1": {
        "events": {},
        "links": {},
        "address": "0x56c54b408c44B12f6c9219C9c73Fcda4E783FC20",
        "transactionHash": "0x68fb7031a2f0dd7c070121b5148c965d101481a3ee8f94a9756658acaf598ae1"
      }
     */

    const libPositionInstance = await LibPosition.at(libPositionAddress)

    console.log('LibPosition was deployed at', libPositionInstance.address)

    await deployer.link(LibPosition, [
        Core,
        TokenMinter,

        Match,
        SwaprateMatch
    ])

    console.log('LibPosition was linked to Core, TokenMinter, Match, MatchPool and SwaprateMatch')

    return libPositionInstance
}

// const deployRegistry = async ({ deployer, opiumDeployerAddress }) => {
//     const registryInstance = await deployer.deploy(Registry, { from: opiumDeployerAddress })
//     console.log('Registry was deployed at', registryInstance.address)

//     return registryInstance
// }

// const deployCore = async ({ deployer, opiumDeployerAddress, registryInstance }) => {
//     const coreInstance = await deployer.deploy(Core, registryInstance.address, { from: opiumDeployerAddress })
//     console.log('- Core was deployed at', coreInstance.address)

//     return coreInstance
// }

// const deployMatch = async ({ deployer, opiumDeployerAddress, registryInstance }) => {
//     const matchInstance = await deployer.deploy(Match, registryInstance.address, { from: opiumDeployerAddress })
//     console.log('- Match was deployed at', matchInstance.address)

//     return matchInstance
// }

// const deploySwaprateMatch = async ({ deployer, opiumDeployerAddress, registryInstance }) => {
//     const swaprateMatchInstance = await deployer.deploy(SwaprateMatch, registryInstance.address, { from: opiumDeployerAddress })
//     console.log('- SwaprateMatch was deployed at', swaprateMatchInstance.address)

//     return swaprateMatchInstance
// }

// const deployTokenMinter = async ({ deployer, opiumDeployerAddress, registryInstance }) => {
//     const tokenMinterInstance = await deployer.deploy(TokenMinter, baseTokenURI, registryInstance.address, { from: opiumDeployerAddress })
//     console.log('- TokenMinter was deployed at', tokenMinterInstance.address)

//     return tokenMinterInstance
// }

// const initializeRegistry = async ({ opiumDeployerAddress, tokenMinterInstance, coreInstance }) => {
//     const registryInstance = await Registry.at(registryAddress)
//     await registryInstance.init(
//         tokenMinterInstance.address,
//         coreInstance.address,
//         oracleAggregatorAddress,
//         syntheticAggregatorAddress,
//         tokenSpenderAddress,
//         governor,
//         { from: opiumDeployerAddress }
//     )
//     console.log('Registry was initialized')
//     console.log('Opium Commission Address = ', governor)
// }

module.exports = async function(deployer, network, accounts) {
    if (network.indexOf('rinkeby') === 0) {
        governor = '0x2083fC00Ad9a17B9073b10B520Dcf936a14eaA05'
    }

    const opiumDeployerAddress = accounts[0]
    console.log('Opium deployer address: ', opiumDeployerAddress)

    deployer.then(async () => {
        await deployAndLinkLibPosition({ deployer })

        // const registryInstance = await deployRegistry({ deployer, opiumDeployerAddress })

        // const coreInstance = await deployCore({ deployer, opiumDeployerAddress, registryInstance })
        // const coreInstance = await deployCore({ deployer, opiumDeployerAddress, registryInstance: { address: registryAddress } })
        // await deployMatch({ deployer, opiumDeployerAddress, registryInstance })
        // await deployMatch({ deployer, opiumDeployerAddress, registryInstance: { address: registryAddress } })
        // await deploySwaprateMatch({ deployer, opiumDeployerAddress, registryInstance })
        // await deploySwaprateMatch({ deployer, opiumDeployerAddress, registryInstance: { address: registryAddress } })

        // const tokenMinterInstance = await deployTokenMinter({ deployer, opiumDeployerAddress, registryInstance })
        // const tokenMinterInstance = await deployTokenMinter({ deployer, opiumDeployerAddress, registryInstance: { address: registryAddress } })

        // await initializeRegistry({ opiumDeployerAddress, tokenMinterInstance, coreInstance })
        // await initializeRegistry({ opiumDeployerAddress, tokenMinterInstance: { address: tokenMinterAddress }, coreInstance: { address: coreAddress } })


        console.log('=====================================')
        console.log('=====================================')
        console.log('== !!!SET WHITELIST BY GOVERNOR!!! ==')
        console.log('=====================================')
        console.log('=====================================')
    })
}
