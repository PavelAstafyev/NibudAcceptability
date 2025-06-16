PennController.ResetPrefix(null)


DebugOff()


// Participant ID
subjID = String.fromCharCode(65+Math.floor(Math.random() * 26)) + Math.floor((Math.random() * 10000) + 1)



// Progress bar
var progressBarText = "прогресс";



// ELEMENT SEQUENCE

Sequence(
        "setcounter",
        "questionnaire",
        "instruction",
		"training_trial",
		"start",
		shuffle(randomize("stimul"), randomize("filler")),
 		SendResults(),
		"goodbye");



// QUESTIONNAIRE

newTrial("questionnaire",
    defaultText
        .print()
    ,
	newText("start_1", "<h2>Уважаемый респондент!</h2><p>Для участия в эксперименте Вы должны владеть русским языком как родным.<br>Прохождение эксперимента займет не более 5 минут.</p>")
    ,
    newText("start_3", "<p>Пожалуйста, проходите эксперимент <u>только</u> с персональных компьютеров. При прохождении эксперимента с мобильных устройств могут возникнуть технические проблемы.</p>")
    ,
    newText("start_4", "<p>В браузере используйте <u>полноэкранный режим</u>. Это важно.</p>")
    ,
    newText("start_5", "<p><em>Пожалуйста, заполните небольшую анкету. Эта информация будет использована исключительно для анализа результатов эксперимента, не будет опубликована или передана третьим лицам.</em></p>")
    ,
	newText("age_text", "Возраст *")
    ,
    newTextInput("age_response")
        .log()
        .print()
    ,
    newText("age_clear", "<br>")
    ,
    newText("gender_text", "Пол *")
    ,
    newScale("gender_response", "мужской", "женский")
        .log()
        .labelsPosition("right")
        .size("auto")
        .print()
    ,
    newText("gender_clear", "<br>")
    ,
    newDropDown("edu_response", "---")
        .add("среднее", "среднее специальное", "неоконченное высшее","высшее")
        .log()
    ,
    newText("edu_text", "Образование *")
        .after(getDropDown("edu_response"))
        .print()
    ,
    newText("edu_clear", "<br>")
    ,
    newText("place1_text", "Город, в котором Вы прожили большую часть жизни")
    ,
    newTextInput("place1_response")
        .log()
        .print()
    ,
    newText("place1_clear", "<br>")
    ,
    newText("place2_text", "Город, в котором Вы живете сейчас")
    ,
    newTextInput("place2_response")
        .log()
        .print()
    ,
    newText("place2_clear", "<br>")
    ,
    newText("lang_edu_text", "Есть ли у Вас лингвистическое образование? *")
    ,
    newScale("lang_edu_response", "да", "нет")
        .log()
        .labelsPosition("right")
        .size("auto")
        .print()
    ,
    newText("lang_edu_clear", "<br>")
    ,
    newText("info_1_text", "Эксперимент проводится сотрудниками Школы лингвистики НИУ ВШЭ.")
    ,
    newText("info_br", "<br>")
    ,
    newScale("consent_scale", "Даю согласие на обработку персональных данных *")
        .labelsPosition("right")
        .print()
    ,
    newText("concent_br", "<br>")
    ,
    newButton("submit", "Продолжить")
        .print()
        .wait(getScale("consent_scale").test.selected() &&
                getTextInput("age_response").testNot.text("") &&
                getScale("gender_response").test.selected() &&
                getDropDown("edu_response").test.selected() &&
                getTextInput("place1_response").testNot.text("") &&
                getTextInput("place2_response").testNot.text("") &&
                getScale("lang_edu_response").test.selected() 
                .failure(
                    newText("incomplete", "Заполните все обязательные поля анкеты")
                        .log().print().center().cssContainer({"color": "red"}))
                        )
)
.setOption("hideProgressBar", true)
.setOption("countsForProgressBar", false)
.log("ParticipantID", subjID)


// INSTRUCTION

newTrial("instruction",
    newHtml("instruction", "instruction.html")
        .center()
        .print()
        .log()
    ,
    newButton("start", "Начать тренировку")
        .center()
        .print()
        .wait()
        .log()
)


//  AFTER THE TRAINING

newTrial("start",
    newButton("continue", "Начать эксперимент")
        .center()
        .print()
        .wait()
        .log()
)



// Training trials, target sentences, and fillers


// TRAINING TRIALS

Template("training.csv", row => 
	newTrial("training_trial",
        defaultText
            .center()
            .print()
        ,
        newController("nowrap", "AcceptabilityJudgment", {
        s: row.sentence,
        as: ["1", "2", "3", "4", "5"],
        presentAsScale: true,
        leftComment: "ПЛОХО", rightComment: "ХОРОШО",
        timeout: 20000
    		})
    		.center()
            .print()
            .wait()
            .log()
            .remove()
        ,
        newTimer("wait_train", 300)
            .start()
            .wait()
        )
		.log("ParticipantID", subjID)
		.log("group", row.group)
		.log("type", row.type)
		.log("sentence_id", row.sentence_id)
	    .log("sentence", row.sentence)
		.log("condition", row.condition)
		.log("lexicalization", row.lexicalization)
    )


// TARGET SENTENCES

Template("stimuli.csv", row => 
	newTrial("stimul",
        defaultText
            .center()
            .print()
        ,
        newController("nowrap", "AcceptabilityJudgment", {
        s: row.sentence,
        as: ["1", "2", "3", "4", "5"],
        presentAsScale: true,
        leftComment: "ПЛОХО", rightComment: "ХОРОШО",
        timeout: 20000
    		})
    		.center()
            .print()
            .wait()
            .log()
            .remove()
        ,
        newTimer("wait_train", 300)
            .start()
            .wait()
        )
		.log("ParticipantID", subjID)
		.log("group", row.group)
		.log("type", row.type)
		.log("sentence_id", row.sentence_id)
	    .log("sentence", row.sentence)
		.log("condition", row.condition)
		.log("lexicalization", row.lexicalization)
    )

   
// FILLERS

Template("fillers.csv", row => 
	newTrial("filler",
        defaultText
            .center()
            .print()
        ,
        newController("nowrap", "AcceptabilityJudgment", {
        s: row.sentence,
        as: ["1", "2", "3", "4", "5"],
        presentAsScale: true,
        leftComment: "ПЛОХО", rightComment: "ХОРОШО",
        timeout: 20000
    		})
    		.center()
            .print()
            .wait()
            .log()
            .remove()
        ,
        newTimer("wait_train", 300)
            .start()
            .wait()
        )
		.log("ParticipantID", subjID)
		.log("group", row.group)
		.log("type", row.type)
		.log("sentence_id", row.sentence_id)
	    .log("sentence", row.sentence)
		.log("condition", row.condition)
		.log("lexicalization", row.lexicalization)
    )



// PARTICIPANTS' COUNTER

SetCounter("setcounter")


  
// FINAL

newTrial("goodbye",
    defaultText
        .print()
    ,
    newText("thankyou", "<h2>Спасибо!</h2><p>Большое спасибо за участие в эксперименте!</p>")
    ,
    newText("close", "<p>Результаты успешно отправлены на сервер.</p>")
    ,
    newText("code", "<p>Чтобы получить оплату на Яндекс.Толоке, введите следующий Pin: <strong>TgbN76</strong></p>")
    ,
    newTimer("forever", 10)
        .wait()
    )
    .setOption("countsForProgressBar", false)
