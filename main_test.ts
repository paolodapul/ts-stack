import { expect } from "@std/expect"
import { assertSpyCallArg, spy } from "@std/testing/mock";
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

Deno.test("`nothing to undo` should be logged", () => {
  const editor = new TextEditor()
  const logSpy = spy(console, "log")
  editor.undo()
  assertSpyCallArg(logSpy, 0, 0, "Nothing to undo.")
  logSpy.restore()
})

Deno.test("undo insert", () => {
  const editor = new TextEditor()
  editor.insert("Hello")
  editor.insert(" World")
  let content = editor.getContent()
  expect(content).toBe("Hello World")
  editor.undo()
  content = editor.getContent()
  expect(content).toBe("Hello")
  editor.delete(5)
  editor.undo()
  expect(content).toBe("Hello")
})