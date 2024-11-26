import { expect } from "@std/expect"
import { TextEditor } from "./main.ts";

Deno.test("get empty textcontent upon instantiation", () => {
  const editor = new TextEditor()
  const content = editor.getContent()
  expect(content).toBe("")
})

Deno.test("insert new text", () => {
  const editor = new TextEditor()
  editor.insert("Hello")
  const content = editor.getContent()
  expect(content).toBe("Hello")
})

Deno.test("delete inserted text", () => {
  const editor = new TextEditor()
  editor.insert("Hello")
  editor.delete(5)
  const content = editor.getContent()
  expect(content).toBe("")
})