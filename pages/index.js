import styled from 'styled-components'
import Head from 'next/head'
import {useRouter} from 'next/router'

import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'

export default function Home(){
  const router = useRouter()
  const [name, setName] = React.useState('')
  console.log('retorno do useState', name, setName)
  
  return(
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>CoronaQuiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function(e) {
              e.preventDefault()

              router.push(`/quiz?name=${name}`)

              console.log("Submit no React")
            }}>
              <Input 
              onChange={ function(e) {
                console.log(e.target.value)
                setName(e.target.value)
              }}
              placeholder="Digite seu nome" />

              <Button type="submit" disabled={name.length === 0}>
                Jogar {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
            {db.external.map((linkExterno) => {
             const [nomeProjeto, usuarioGithub] = linkExterno
             .replace(/\//g, '')
             .replace('https:', '')
             .replace('vercel.app', '')
             .split('.')
             return (
               <li key={linkExterno}>
                 <Widget.Topic href={"https://www.google.com/"}>
                 {`${usuarioGithub}/${nomeProjeto}`}
                 </Widget.Topic>
                </li>
             )
            })}
            </ul>

          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/leorejwan" />
    </QuizBackground>
  )
}