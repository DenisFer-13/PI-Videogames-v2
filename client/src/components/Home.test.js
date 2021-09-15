import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Home from "./Home";
import GameCard from './GameCard'


describe("Test components", () => {
    it("should render component Home", () => {
        render(Home)
        expect()
    })
    it("should render component GameCard", () => {
        render(GameCard)
    })
})