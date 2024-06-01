import { defineComponent, useCssVars, resolveComponent, openBlock, createElementBlock, createBlock, unref, createElementVNode, toDisplayString, pushScopeId, popScopeId, resolveDirective, withDirectives, vShow, createCommentVNode, createVNode, ref, Fragment, renderList, computed, renderSlot, withCtx, resolveDynamicComponent, createTextVNode } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { cloneDeep } from "lodash";
const defaultAvatar = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRjQ5MTk4QThBMjkxMUU4ODgzQUI5MTM1QUU0MEQ0NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRjQ5MTk4QjhBMjkxMUU4ODgzQUI5MTM1QUU0MEQ0NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNGNDkxOTg4OEEyOTExRTg4ODNBQjkxMzVBRTQwRDQ3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNGNDkxOTg5OEEyOTExRTg4ODNBQjkxMzVBRTQwRDQ3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4AJkFkb2JlAGTAAAAAAQMAFQQDBgoNAAAK5AAAFHcAABroAAAjIf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8IAEQgAlgB4AwERAAIRAQMRAf/EAP4AAQAABwADAAAAAAAAAAAAAAAEBQYHCAkKAQIDAQEAAgMBAQEAAAAAAAAAAAAABAYCAwUBBwgQAAECBQIFAwQDAQAAAAAAAAMBAgAEBQYHECAwETESEyEyCDMUNBZAYBUkEQACAgEBBAQJCwEGBwAAAAABAgMEBREAIRIGMUETFBAgUWFxIjJCczCBobHBUmJysiMVkUDw0ZIzQ4JTVIQlJjYSAAECAgcFBQgDAAAAAAAAAAEAESACEDAhMRIyA0FRgSJCYXGREwRgobHR8XIjM/DBFBMBAAEDAgUEAwEBAQEAAAAAAREAITFBURAgYXGhMIGRsfDB0fFg4UD/2gAMAwEAAhEDEQAAAd/gAAAAAAAAAIQxfI8yZPcAAAAGq00XFqioTMQ3iGZ4AAAMTzkYPQiysSvj2NiBtrMoT2AAMCjlYAJ2VoRBMCqTqYL6AAHNKYGx9/1e2qkR52VaAZsnT2AADkkM9aratu9bstB7tFPS4cbNgzbHLGmZE0e2atdgIAANGUGdktU7bmRy+oI2RFms6ALX7dWE3a423Xscfz6AAtJQb/QUOXVOvaI2RFms6AB5LkXWmfTPAACXQ5dq6JfYXRvEbIizWdAAre0VibdCAAABbCkXin+R1xGyIs1nQBF79FwbjUPIAABKoM61lDvnw17Y2RFms6B5K2tFYm3QgAAAASmBPsTQPo1QyIMdNhVjYK/VnZ4oAAAEKfXXnaml3il4PSq3qca5lqqX33affLwAC1fuOp3fqwQ268ZssOrWDNyF150RWLRWNjrkTv0cuPS585Mz9O3Z3GkXswzpl5yWzodosvAN0cfduTiT9adD/WWeFu/PFMdSlcx/S54E/wDPemrnT8Lc8eeWVGAF7Mcuq3n9LUR8s/e2zW//AJE12WD5pqelxgBthiycdvPdYm7UAB0BVf67Y759+t837X8A0s/QPzRZjPAAZQ69lstWzEjZgABl9S/0RmnSv0ZUva+b6rPqn4uAArPz3//aAAgBAQABBQL+Ic4JUVVzfiijEouZsX3AZFRycLL/AMkZKz5q574u285mKb9eycq3nYZcdZutW/U4GbbwmrIxq97yORVSGmckUsjXHhFVq2F8i7pthtrZlx7drUVFTb8lqY2pYh1kPrIUiQ074+6GiUOmVe56rjizW2HaG35SZAnrhve0bOr18VSvWNeFsOiQ+trgC8HWlkbdnynFpmXvijbzR02J+1bYqpB43x657MZY7ZDcf2GyM02NbjscWPJHqV57vlTjas1iq4BkWSOKdAe7S95A1Us3C+DnWhUd0+z/AKaJR5G36XoD3bGJybtPKhmIMzxm0B7tZeWGxu+pC8czoD3aBH5ScCblmzIiDeJ0A90dYlZfwt4M3LDmBsqAHRLmErnzQGRTGtILgmOGXZ7oqVLG1ZemS6ElqeNzxjQLEci7rsvW2LIp90/LU6vrmcMpV5Zyfn6iXFF1fuWP3Na9q057JgQmhbF73IW4b1o+Ucg0Nbc+T1Zl3WfkK1L5BFZq0lQaTfF5Va/Lj1+JV1cn1KpS1Llpy/61WLgtS6R3HKZUr/61YGtLqlQos/j67g3vafynud1JsbZjq6y2TecmBowSzwEqdjytPmLW+R94EePZ8XrhUc98q6ys9f8AttrIn+tgul/kYyq/29QyHcP7VeuzDNVWkZLzs6cflnbjJ1S8VL/IqLqqyQ2246aZcP8A/9oACAECAAEFAv6eQjRNYUb+NUH+sIQjYGYvPyljyEgBHeXf9wNCzi85jQfXQa8nrNp37plFQ7nK92g+uxvo3aUAzQRvaTQfXUQWNTfOs7DaD66DZ3v4EwFDsc1zHQProAXjTgnAwzYH1iVG3t4XWJmWUKj6jGpHMZ427uXOOyO1NOiqiORZNzSjG0bYanJO1IUcKipqictj4VUahJwhDSx/Oxqc12KnJWddi+qLyRE5d8l2+AabSJDOm2pE8YWdZAnJ7U5Jsf7W9NtY7e1nWV/I2r0//9oACAEDAAEFAv6eMbyueIjONTmekKMboIEXLxDjxjg42+Lf9uRRSacpfQvt0InNiSi9m6VVFA1qMboX27HertojkDA3d49C+3UpnuXfJP7waF9uhH9jOBLmUD2ua9sF9uhy+ReCA7wu7FgqL29qrE29yP4XSJWb8qFI7tIbsa9/kdu58o745rp1hFVqpONcIhHEdCrzXuWPJCKi6r67GQIbzEk7ZkpGm1qkrSph3omxF5o7psTqNr3vehGytzrMf6z12jh3XbZ0j95Vpr6d3SXkll9V2N6u67cfuL5pr6dcVW0jd//aAAgBAgIGPwL2PxT3LkINcNPjRykhZpvFZisx8UHJao8k5kYge1MMkcz71imvqAIucWoy7jGJuqofYYhLU4erYsM18LnMarmvg8zqq+xOP10MFhF1RbSyY3LkyFMKGosVsbrEbgsUlkouT9QiaNzcjhuQw8U8LxkC+b+Gg6Z21sh6raJH3x//2gAIAQMCBj8C9j8Ml65wRXTanCjmAWWXwWULKEWFtR5wyoREdic5o5W3LDLdUPFyGxCbaRGZemobaIjNU4unasUt0LDKKrlyweVsq+1NdqUPMsRvq3Ti9c+cJzQ9FtTLo6dupMQB3lf5/USjU19TOf6l3Ae829wkE2LRntl38fntrRLp/sJs71JLqnFqhnO8taVN59zDD9v1d+1NC0curN+vQGLj0++3guKl9bLm0yx+0/I/Gt9TKJfwGWVzuNrDfaMXguK9QQH/ABn68L/hH//aAAgBAQEGPwL+ySWLM0VeCJeKWaeRIoo1HS0kkhVEX07NFd53xDup0YY3veaAPWC2GrX01Hp2FfGc54hpm9iK6bGIdyToFQZeCjxsT1DfsGUhlYAqwOoIO8EEbiCPk7XLXJ0NbMcw1y0F/ITkyYnETj1XrqkbK2QyEJ9peJY4m3MWYMgNrmbPZDLNxF44Z5itKuT/ANLj4ezpVR8ONfA3wj+tNoxiMm82NDayYTIF7WLkX3gkLMHpu33oGjY9eo3bQ0ZHGC5iYAHEXpl4LUnX/F3CI47mv3CEm/CQNfkeYs1j5DFk3ihxmMlXc0FvJzpU7yh6pakDvKn4kGxd2Z2YlmZjqSTvJJPWdtxI237/AK9m0P8AtHcen2k8AZSQQdQRuII6CD1EbQ4/mFDzTiI9EV7ExjzNWMbv2r7BxcVR7s4Zj0CRRtGtLPV6F19P/GZopjLgc/7adu/dbT/Bkk2BB1B3gjoI8o8bmImaGF8dNi8nF28qQrK1e/DG8KtIVBmevO/Ao3u+ijp8Rvhn9Sbbnb+u3rSN8yqfr298+nT/AB2p4TA0JLuRvSiKCFN/5pJG3JDDEvrO7HhVRqdsXy6bTXbNdXnv2yWKTX7J7Sx3dW/06sR0SMaD1FBO8nxpuUIJ3TBcpmKLu6sRHbzU1dJblyYe+1VZu7x6+xwuR7Z2bDcu1UtXkp2LzJJMleMQ1gNeKaUiJDJI6ovEQONhqRs4z3LeYxqI5j7zNSlai7Dp7HIRCSjOPOkjDwN8M/qTxMUknB3DmNl5evcQGqd+mj7jOjnfH2V9Y+Lq7Mt4/O0MoI7xk48jGep4snSq3kKnrA7fh9I25m5pkQdpatw4Oo59pYqkaXboH4JpLMPzx+Ay5TlzA5KVvakv4jH3JD6XsV5GOx/9G5RHqnenLuJjPSOuOop23ck8sf8AHhaMnR8SFtvU5J5SX8vLeHH1U9s/ZxuAw9C9io62RrWKGNp05UWvaiFpe0rwxuY2pPJ6vRrp5NuU6NYN21rmLDRJw9K65CvxSeZYk1YnqA8ePnnB0Y7VbGYKOtzAsEx78q1J7U63+59iBLBWqzASOsjOFGpQKhbbljReGS4MlemP33sZW72bH/tkjHzeE/l+0eHmzG1YTYtXuW83VqQDTiltzY6wlVF10HE05XTz7Y3nDmex2mchjd6eIgCtWxht1ngd7czAmzejinI0ThSNuhn3EeNOrjUMx3EahkYfSNNqmHxkXYUKKvHUh4mfsYWlklWIM3rcKceg83hP5ftHiqPIoH0eN+4upHQw3MPnG0qDoSR1HoDED6PCfy/aPER+H1+EHU79CRv08nyDN7sujj09DfT4T+X7R4VTz7/yjp+R4ehxvRvIf8DsUccLDpH9+rwH8v2jw6t/qN0+Yfd+SPEPXUHgYe0PN5xtwycUDjpWQab/AE9H1bHSWM+r1OvlHn23uD5l9Y/Ru2FkqQzFuEH3VB019LfJdpPNFBGOl5pFjT/M5A23dHl8vo21aMSQn2WPtJ+EsN42JHaD1Tu4hp0jyqTsAicR62feF8/k2CLvA/r5ztuI9HX/AE8b+S5my1fGwtxCvG2slu466ax06cQexZcajXhXRddWIG/aSDkzlqJIxqEyPMUjSO46OJcXQmjWI9YJsv512fvPN2RpRP0QYbs8MiKfcEmOSCy4/O7Hbtshdt3pv+bcszWZf88zu23LWckkMlx6C0smzFeM5PGk0bsrhfZ71LB2wH3JBsVYaqdxB69v298Tg6Mfc3jc23CvznrJ8p8HMPMUE7gXMpO1GeItFIKFfSpjt4IZWFCCPXz7L3DmzL8C9EF2x/J1wPuivkhbiUegDaOHmnB1MlDuDXMUzULgHXI1eZpqlh/MpgGxkwGSWWxGgezjbA7tkqo6NZarElowTpxxl49fe8GSzWRk7KjiqVm/afrENaJpXCDdxSMF0Ue8x02v8w5aVy9mVhUq8ZeHHUFY91oVgdAsUCHeQBxvq59Zj4nMvJc7+2I+Y8amnvL2OOyw49d5Ze6lV8iudpLVljwxxyScCAvK4iQyPwIurHhRdT5NhkK9iWlXpK/8fVjb1EUvGGedfZnkmX2tdRpu2JeLu92DRLEe/sZG0146zHpGnSvtJ9O3M2SRylg456FNlbhkW5lCuPgkj/HXax2voTxKuUxVuajfpSiatZgbhkjcfQyOu5lOqsp0O7bFZ9AiWJ4jBkYE6K+SrftW4wNSVjZxxprv7N12o8vwScE/NGTCTAHQtjMT2dyyN2/fdesPRr4uB5kT1o6Nvgtx6kCShbjeneU6dJFadmX8YB2lyuTljllkrtLJIdGr1qfAZDHF7Sdn2e9iOn67klWPsaztYevCTqYoGsAxR69fAhA2rCrxpL20z2JOIGaLIKQrMCoTRezCcI+5p179sXyOynvFeaPNZGZCOykXs7NahFoN/EQ7yMOj2D6PE5i5Wlf9uzXizlNCdyzV2jpXuHyvNFND80W2PxKvrDg8BWVk+7cyM89uY+bjqd3/AKeNiB23Flv/AI63v9cDGInFK3W/bYYwcZ+9Ns/wW/XHtZxMraRXo+3g1O4Wa6kuB8Wvrr8MbcxZsPxwWsjLHSPV/H09KdAjqHFUgUnznxeVpuLRLd1sVKOpxlYJaMSn0WZkYecbc5m9G0Uvf6yxqzK2tNMZRShICjMOGaisbgdI4t+h1HjX0MUpxDScSTFh2MeRVYRLGiltTJLWZC5AOgVderZ/gt+uPa4cJHNLlO7TLTWuVWbjdCrSIWZRrFES3n08bAtQjaW8uZxbU4lKq0loXYDXjVnKqGeXQbyBt//aAAgBAQMBPyH/AORSfsVeVDdBT9HEA8KiWS4bU2swDgM0uBIlsUfkCQ65iCRM+m2D90rIOAKjibWRyK1EjnEjXjdGP+dKnUkDAEqD5VIYXswiF819BnjdQtauOuVFFnAfqQqjdrwAKVZLfx8sVawds/b9uB0HPq6QIUFmi/dHRAJWZtUAKIi4YbELkmK4JgCAoJELInNkrvJcvSjEAo5R3gBJPhmpFqda+YRQARHqJvdjR1Pf1Xtw6AUQBrGkaTRDYnsomvKpiyZwqgZAuE37hhkkXS10xgZFuj8CNsZIC48w7XGTdKCyLmUrROafSHjoRSTUYc0pGazlq8rJ3FnR4NvaV53aHdqfGxS8M8oqVl8o2LZYYb71eEzVP5FpSQMCUyxOU5EspyhsllkmA1APOgrliWSEuqaNwvhtZ7wx2nj8pxcnBgSZAKSQoSeKykR9ax1ojNzmaNyTCSEZFcVZCNtkS6zxUAS54+U5EFQCVYAyrgKR/KXcA80HbEISbah0ZKKRXAu3QdbOPlORuSNyMEYG13v6DQlhOlgHeM+/HynFbRmT2uP48+iqcSemcOu//wCUh9MJ4RwrR14eU4IKAFVgC6rgCtpk84D99fSsypQpAW7VdGntEnoasbO9GwmbKvhoDd92Tpoe6Ub4TXmeuKZ2xu+ikcACZcCXXvUxTKR0nz7471OosCvu0dJm9JvOUGhP7BvUMQupJuNe1pqYTKnJbhpd0pJEJkJDvkc11C1nay+ihihHBJdSkBJqJOhCDykLzV1TqxZaUN8yxTmXc96ZydAcxEasqTrQDyo0gah3zQI78GHWjp9X/EeKUBVgLq2ANWnb5hxSGWlJY4q7lyZM1W+3zq0sHeP/AEyp7zPpBqkPELpoutwjbaYLbF3c4BdpTxn12ZEQGmoeMXoM0M8q5TieoRB6rjj6gsSIGa3lyedDtaOTG2WjMMJK9auJVZLyQoHHcIJ8uBajpyL0JPMRNXCekNSUzZBr/LIBtMo3aYJCQgC3JaLDnlFm5oX5YwDIaNTJtstiRyUgb27RFLVDV7u5xrFTCpvKIbhWWYVlQ+g+u60E/MIIXtyli2BEXLCXGZHerpYDm3P+w5klxZhygkyTjd188IBTaQxS4UAyFQ9zsOUBjQuLTPXlz6+sb8DBm3R1evoZ45wIIAQ5TQhqJcsv2AMTKoCh2BQnq4XmyIKw8pRFlnyHkkBboV//2gAIAQIDAT8h/wCPllE4r7NL/GfWtbQl9H74EQN0UpN+LdX+zX+6qKMVs+gypHjLp3rokg8HH6+IPYB90QDld/nPrUu9tKeZvH6+QJYM0FDIHNsU11oi8KeeP18kfcT0FXr/AO+eP18W0zXt6MpWGXX+NOjg8Pr4ArBmv89unpbESzqf+cPr4XhdePTmMH46VnWvHRr6a/GZQBdFCOOYWFFQOnBJNlODl1D7tbbv+t6/BbwgaK5KHVxUEsUAg5DRzhpfapdOO/bvP/lXQRk29qgTkQSHHCgmW3KLFNGGXpJhF8HSa6tl935HtzW0UGXNrS49vxHvX1VpyvO5/wCfVQJyiVWHmEo5wNy0vtb5r6qIzII/5745sk4r/9oACAEDAwE/If8Aj4RTGa+jS3zj1rk1Yfb+uDEreoNFtK+yv82v8kqaEC+PQIUnzg17V12y+Xj9nFDsq+qYlxsf3n0OWe+tHMXj9nIsEuKQgwrzblNNKZPBfk4/ZyTMzfQEOn/njj9nEtY07+jCV1h0/pRp5fD7OCgS4r/fbr6RWVzc0/2k7lyoCzmjTUoDbE9fTicvs/tXiw5N+pUBjNXy9t6RLKpEzzIyp2UtrwGHVR14NS+xsb9v3tX4DOEzQHDQqYXgsXpSl5FpQkQaxKQEtsutIYVz9mGynCQ3GhQmQHYg4O57Oi4KV5BRkzV4p4cqiVSHoSGZNo6zio1wO0eY3pAwja2NZlb5GsoAtzRZo+ZFGZnaNj3lHvrB+cNR/wDOWz8PzpyPK4NZeYs2RlLLbTIZSCGcSTg/OGhBuKFDNskvKBlSAsHMZr//2gAMAwEAAhEDEQAAEAAAAAAAAAAAJAAAAABAIAAAAIAIABAABAABAAAAJ4AAAAAAFnygAAAFNvbhwABHt7bgAAONvbaAAAJt7VAAABXvdQAAAAt7gAAAAHBEwAB0PPJCbQ3JOmU20RJIJT228JJJNc22dJJPs22z/9oACAEBAwE/EP8A5I+DNmrgJuU3qfKQLkBJmyJQJFRLCJDCEi+giknWql/Ug4ggZPTLUGYJZEj6FQG/B9YGCaQIOUm/FqgNVTjDfoi4FKjhU0IkCFeFzGPRmBTkABM3Ag6ItM6IHFKCSjKstLyhv9YlR4m/YuwJe5PWiEVGYmmgFi3q4AJdaibREgiJJU9WNphEMEAMwZt2oXWLwtQzEIAA+YiUlcIiiPNf6TZFYT2D6blIBgMCBGBgFBUJuEeHRPE0SVDNtdkgnsRS8HgsZvJn/f5Al4WYAy84webOB3ytAO8EEmooSyGx3NqqmlVU2Yx9aQjBKRCBGkSzZ2eUghKVFzpBToQUzz+8KIBNC6MpEcKAigqQAmwLuJhfgWkkDqCxeIlLU+tHqZQsJC6yaUgVpXMlAgJsANQxSZAiCWMMweszRfUN/wCCqGYVFAqTXoXXTaDC1AX0F1fRi2HpvFiEXOkIS8lLqHNuh4wGR7dCQEKhQIJrBM2IMOKkIBBEES4jcR1E5pCmRgCNy3jIwjqUkFnWHAjWbWIJc25EwwCoQAuqtquE31nVjW5zDR1l8FYoX1QAWQmgjE37kMBJC+vPu1M++JGmEgxDf0D8iCl1x8JVGgebcbBTG6wOkiDqCgAAIAgCwBgPQZNVM2zGKMAnRhRSE7A/DWW4SC5ybjDOGUEASqrYoGAUMHSBlG7LO4B9JUiPYBLVhr2ryQ3piyUXrUAoCbMztVnnEuM0rBemCLwZndV7Chd5+WiiCBtBBq9IsOiKftWMDJp1gy0ATtIzPZFzErxFMiouacQNd6sUxBFZYzcqss0SS3eADokcVCTrgm9Ags7Bs2BDK0stHNPNoQR5poyZvp10lNwkNsLSxgBEhdCCVCwMnTyUpFFKSS1ThBLYxcuoLN9KJI0xTHJQFAoYDYAqER8ORuXq/qZaUGqCwWJFma2KABZQoeDAsUCYCgAJUYAAu0eJjGvrcYiiJQK75W3iRjyFC8iXUSKsomUTzINJLIaSheLtiMkPAK4WK6zHM/VKTEAppirbUUFggc5Bjjc+NKCKNTLiCoN43XMyB3w8rAqTdTmCsIxGwJOk3g4CrtQZoBPXVFREhScLpJjlyXnfBFEhM5un6TBJQkeYHA9kphALJ6kIhOv4g8k74FJpNb9ICSUM2Ov4YxdISYGk426qDcpy7qdLWEiQyq70B/I3q5AYqgvNEE+UacifRtmWsbsBDTLVFEiYQCI1ZRA5ZEx4K1auiKkuSqWSMhAFaglyZgM06e07EAZbjKWVVyTgPw4hUkdYHZ0gt8ikxSIDubgR9qADgMGMFBuCWkAgqxgAzmwk5oKhDt6SyPAgKf/aAAgBAgMBPxD/AI/FkMFZehexKxoNCiokwD5Kz3D1nVLIHVfAHy4dEUCeEp4INy6m7Smfk/2ls/idaNNRQpLjGXePQn2hIUuuE5shIkBkBlimnsw3SJvK8cvf9nFC4bXYBPip4YgmU3GgZvKmhQiSYea88UHcDD2g9qZCYVcSwE+8ccvf9nIgBKYCsKBPcA5gi4EAUBtJk6MlSOxKcwIPHHL3/ZyXhWyrMKCwYL9J6+hCayF6xA7wnsnHL3/ZxNOTPQLvix1SgAgx6CyC42Nj8D7OQpwD4R+zcciWThl7/s4AjVMAZWp3BX6NP2evY9JiGHI9yOu4faG/DL3/AGVIVDlIQnQMW6u+1jWfSZWWZ3ny74xE6XLvs6r8Ide9GX3/AGUWPuuBu/oy1N1kTmXL83j42rLh/XfbmagzRZXx/awA970AWCK2wVu2Twk9aPsWEcJWOaYXWSbo1fagB93Vbv6NOEuF4vrdu+WsefX1SbsPW5+fNPQLb6cEAZWgfJWQdqYSEJmASsF7BpQuaEXckcIZGQLNVBmsDeUytnZudbLNuJv2L8iIJVOujTtU4sD75ZzWlQkCGWIC89IzU2zVsKw9iCiUlK4u6XAWiw0hKt6yrsfvlkDpZ/X7qJ7nml1EDvK67QK7Ky/jJUyrXsVz3l8K3JC/fXlh2oT8XqNrbmfCSUDdLqIJBhRZQMMZfxkovSekFwyWCwiTgGVAXmh0Bn4r/9oACAEDAwE/EP8Aj8yQhIWOrYlgJ1SlUGGJV8MnsvrCBXDsAfJPw4dUVqfKNHViOB0digcfA/lQ4/G6VZFkIBsk4MRPoR73ZBsSGMYIzCpCpBNA0Mt1mLwHHB2/TxAOSw6qjzUEFyDA7LVcWsOrSIw5OawdEnZJL3l96JCJYMwKse08cHb9PICJAJWsohHZV5lmwkqBTvDh6kNQGyKMSC+eODt+nktzggCJBQly20mPQnFdWdJldpR3Hjg7fp4s3AjqVjzd6DSzdz6AySw3Nx8h7mFowB5E+nZMI3Hhg7fp4IkAEq4Ct1K3Vr/HTu+lcAELlNp6DRPeS1FWd8/lHBC3R2axSDraiBBKGpBh6G293SPSssN9keHbOZjULeHQJofZp2qFMrdOjs0bQDALK2P3oFRdYEYgwfGvzvWHp++2/tzFSora/NZZe1qVc1G6h518zHSnTNkTI1hakjpQdk6PpSJ+xoNj9uvCJG020sWPBWRPv7olgJ0oy++2vAArBSpyF199XOZkQOcAkCUBMqFIDyKmGSxXxCS1FZ0qIpBBLEIgACFBFKEMxbu8gJIFCWvXvUXUfrljtjRXFvmAFF5IIaxQgxRIFADQNBpMUh6HiZAwiEIyALgBjPd/XLdTvUwNjmuUpOSkJmgKg8FTe/kQXRCO0AOppW2s+NOWTbsfNqlc35jYRtqPmhBEgCVTwVKSPGEBnIkKIxKFOWcYzJX/2Q==";
const _hoisted_1$2D = { class: "square-avatar-box" };
const _sfc_main$2O = /* @__PURE__ */ defineComponent({
  ...{
    name: "SQUARE_AVATAR"
  },
  __name: "SquareAvatar",
  props: {
    width: { default: "120px" },
    height: { default: "120px" },
    modelData: { default: null }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "0077cb2f": props.width,
      "169abe44": props.height
    }));
    const props = __props;
    const defaultImg = defaultAvatar;
    return (_ctx, _cache) => {
      const _component_el_image = resolveComponent("el-image");
      return openBlock(), createElementBlock("div", _hoisted_1$2D, [
        _ctx.modelData ? (openBlock(), createBlock(_component_el_image, {
          key: 0,
          style: { "width": "115px", "height": "115px" },
          src: _ctx.modelData.avatar
        }, null, 8, ["src"])) : (openBlock(), createBlock(_component_el_image, {
          key: 1,
          style: { "width": "100%", "height": "100%" },
          src: unref(defaultImg),
          fit: "cover"
        }, null, 8, ["src"]))
      ]);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const SQUARE_AVATAR = /* @__PURE__ */ _export_sfc(_sfc_main$2O, [["__scopeId", "data-v-3997e77d"]]);
const _hoisted_1$2C = { class: "rectangle-avatar-box" };
const _sfc_main$2N = /* @__PURE__ */ defineComponent({
  ...{
    name: "RECTABGLE_AVATAR"
  },
  __name: "RectangleAvatar",
  props: {
    width: { default: "118px" },
    height: { default: "150px" },
    modelData: { default: null }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "1a889041": props.width,
      "1cba7e0c": props.height
    }));
    const props = __props;
    const defaultImg = defaultAvatar;
    return (_ctx, _cache) => {
      const _component_el_image = resolveComponent("el-image");
      return openBlock(), createElementBlock("div", _hoisted_1$2C, [
        _ctx.modelData ? (openBlock(), createBlock(_component_el_image, {
          key: 0,
          style: { "width": "115px", "height": "145px" },
          src: _ctx.modelData.avatar
        }, null, 8, ["src"])) : (openBlock(), createBlock(_component_el_image, {
          key: 1,
          style: { "width": "100%", "height": "100%" },
          src: unref(defaultImg),
          fit: "cover"
        }, null, 8, ["src"]))
      ]);
    };
  }
});
const RECTANGLE_AVATAR = /* @__PURE__ */ _export_sfc(_sfc_main$2N, [["__scopeId", "data-v-2786113a"]]);
const _hoisted_1$2B = { class: "circle-avatar-box" };
const _sfc_main$2M = /* @__PURE__ */ defineComponent({
  ...{
    name: "RECTABGLE_AVATAR"
  },
  __name: "CircleAvatar",
  props: {
    width: { default: "118px" },
    height: { default: "118px" },
    modelData: { default: null }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "d79b3524": props.width,
      "4f696302": props.height
    }));
    const props = __props;
    const defaultImg = defaultAvatar;
    return (_ctx, _cache) => {
      const _component_el_image = resolveComponent("el-image");
      return openBlock(), createElementBlock("div", _hoisted_1$2B, [
        _ctx.modelData ? (openBlock(), createBlock(_component_el_image, {
          key: 0,
          style: { "width": "115px", "height": "115px" },
          src: _ctx.modelData.avatar
        }, null, 8, ["src"])) : (openBlock(), createBlock(_component_el_image, {
          key: 1,
          style: { "width": "100%", "height": "100%" },
          src: unref(defaultImg),
          fit: "cover"
        }, null, 8, ["src"]))
      ]);
    };
  }
});
const CIRCLE_AVATAR = /* @__PURE__ */ _export_sfc(_sfc_main$2M, [["__scopeId", "data-v-52ab2756"]]);
const _withScopeId$q = (n) => (pushScopeId("data-v-98b6dcd2"), n = n(), popScopeId(), n);
const _hoisted_1$2A = { class: "title" };
const _hoisted_2$1D = /* @__PURE__ */ _withScopeId$q(() => /* @__PURE__ */ createElementVNode("div", { class: "left" }, null, -1));
const _hoisted_3$1f = { class: "editor-resume" };
const _sfc_main$2L = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "696fbd96": _ctx.modelStyle.pTop,
      "001cae4b": _ctx.modelStyle.pBottom,
      "4161d396": _ctx.modelStyle.pLeftRight,
      "6169fc88": _ctx.modelStyle.mBottom,
      "697277d0": _ctx.modelStyle.mTop,
      "3fd3598a": _ctx.modelStyle.themeColor,
      "6c2a7474": _ctx.modelStyle.textColor,
      "3c9919b8": _ctx.modelStyle.textFontWeight,
      "e9f768a6": _ctx.modelStyle.textFontSize
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2A, [
        _hoisted_2$1D,
        createElementVNode("div", _hoisted_3$1f, toDisplayString(_ctx.modelData.title), 1)
      ]);
    };
  }
});
const ReResumeTitle1 = /* @__PURE__ */ _export_sfc(_sfc_main$2L, [["__scopeId", "data-v-98b6dcd2"]]);
const _withScopeId$p = (n) => (pushScopeId("data-v-cd662227"), n = n(), popScopeId(), n);
const _hoisted_1$2z = { class: "title" };
const _hoisted_2$1C = /* @__PURE__ */ _withScopeId$p(() => /* @__PURE__ */ createElementVNode("div", { class: "left" }, null, -1));
const _hoisted_3$1e = { class: "editor-resume" };
const _sfc_main$2K = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "70d47ee2": _ctx.modelStyle.pTop,
      "65c0ce9e": _ctx.modelStyle.pBottom,
      "459a4a0f": _ctx.modelStyle.pLeftRight,
      "2e6ce6ee": _ctx.modelStyle.mBottom,
      "70d7391c": _ctx.modelStyle.mTop,
      "b3c2e538": _ctx.modelStyle.themeColor,
      "61dcaeac": _ctx.modelStyle.textColor,
      "052d29fe": _ctx.modelStyle.textFontWeight,
      "e95c1df2": _ctx.modelStyle.textFontSize
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2z, [
        _hoisted_2$1C,
        createElementVNode("div", _hoisted_3$1e, toDisplayString(_ctx.modelData.title), 1)
      ]);
    };
  }
});
const ReResumeTitle2 = /* @__PURE__ */ _export_sfc(_sfc_main$2K, [["__scopeId", "data-v-cd662227"]]);
const _hoisted_1$2y = {
  key: 0,
  class: "name-introduce"
};
const _sfc_main$2J = /* @__PURE__ */ defineComponent({
  __name: "NameAbstract",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "4cd73f3f": _ctx.modelStyle.pTop,
      "245547fe": _ctx.modelStyle.pBottom,
      "74e3f682": _ctx.modelStyle.pLeftRight,
      "4f22aa3e": _ctx.modelStyle.mBottom,
      "4cd5e222": _ctx.modelStyle.mTop,
      "7187ac2e": _ctx.modelStyle.titleFontSize,
      "c8bbc636": _ctx.modelStyle.titleColor,
      "34e0b765": _ctx.modelStyle.titleFontWeight,
      "457c8092": _ctx.modelStyle.textFontSize,
      "2c2eddfc": _ctx.modelStyle.textColor,
      "cb37e6a4": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return _ctx.modelData ? (openBlock(), createElementBlock("div", _hoisted_1$2y, [
        createElementVNode("h1", null, toDisplayString(_ctx.modelData.name), 1),
        withDirectives(createElementVNode("p", null, null, 512), [
          [vShow, _ctx.modelData.isShow.abstract],
          [_directive_dompurify_html, _ctx.modelData.abstract]
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
const CUSTOM_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2J, [["__scopeId", "data-v-6a095139"]]);
const _withScopeId$o = (n) => (pushScopeId("data-v-d1b4e876"), n = n(), popScopeId(), n);
const _hoisted_1$2x = { class: "resume-title-word-box" };
const _hoisted_2$1B = { class: "top" };
const _hoisted_3$1d = { class: "left" };
const _hoisted_4$J = { class: "right" };
const _hoisted_5$I = { class: "icon-box" };
const _hoisted_6$E = { class: "icon-box" };
const _hoisted_7$t = { class: "icon-box" };
const _hoisted_8$o = /* @__PURE__ */ _withScopeId$o(() => /* @__PURE__ */ createElementVNode("div", { class: "bottom" }, [
  /* @__PURE__ */ createElementVNode("div", { class: "left" }),
  /* @__PURE__ */ createElementVNode("div", { class: "right" })
], -1));
const _sfc_main$2I = /* @__PURE__ */ defineComponent({
  __name: "ResumeTitleWord",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "6740fb79": _ctx.modelStyle.mBottom,
      "3376da72": _ctx.modelStyle.mTop,
      "33742038": _ctx.modelStyle.pTop,
      "05f3ad3c": _ctx.modelStyle.pBottom,
      "759ce5a4": _ctx.modelStyle.pLeftRight,
      "f61635ae": _ctx.modelStyle.titleFontSize,
      "21e39da0": _ctx.modelStyle.titleFontWeight,
      "4bb0fdca": _ctx.modelStyle.titleColor,
      "75c80948": _ctx.modelStyle.textFontSize,
      "16c419da": _ctx.modelStyle.textFontWeight,
      "94046712": _ctx.modelStyle.textColor,
      "53bdae0e": _ctx.modelStyle.themeColor
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$2x, [
        createElementVNode("div", _hoisted_2$1B, [
          createElementVNode("div", _hoisted_3$1d, [
            createElementVNode("h1", null, toDisplayString(_ctx.modelData.name), 1),
            withDirectives(createElementVNode("p", null, null, 512), [
              [_directive_dompurify_html, _ctx.modelData.abstract]
            ])
          ]),
          createElementVNode("div", _hoisted_4$J, [
            createElementVNode("div", _hoisted_5$I, [
              createVNode(_component_svg_icon, {
                "icon-name": "icon-education-1-copy",
                "class-name": "icon",
                color: "#fff",
                size: "22px"
              })
            ]),
            createElementVNode("div", _hoisted_6$E, [
              createVNode(_component_svg_icon, {
                "icon-name": "icon-rongyu",
                "class-name": "icon",
                color: "#fff",
                size: "22px"
              })
            ]),
            createElementVNode("div", _hoisted_7$t, [
              createVNode(_component_svg_icon, {
                "icon-name": "icon-ziwopingjia",
                "class-name": "icon",
                color: "#fff",
                size: "22px"
              })
            ])
          ])
        ]),
        _hoisted_8$o
      ]);
    };
  }
});
const CUSTOM_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2I, [["__scopeId", "data-v-d1b4e876"]]);
const _hoisted_1$2w = { class: "model-title" };
const _sfc_main$2H = /* @__PURE__ */ defineComponent({
  __name: "ModelTitle1",
  props: {
    title: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2ffd9ad2": _ctx.modelStyle.themeColor,
      "eb741dd6": _ctx.modelStyle.firstTitleFontSize
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2w, [
        createElementVNode("h1", null, toDisplayString(_ctx.title), 1)
      ]);
    };
  }
});
const ModelTitle$7 = /* @__PURE__ */ _export_sfc(_sfc_main$2H, [["__scopeId", "data-v-ecbedd2d"]]);
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid2) {
  return typeof uuid2 === "string" && REGEX.test(uuid2);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid2 = (byteToHex[arr[offset2 + 0]] + byteToHex[arr[offset2 + 1]] + byteToHex[arr[offset2 + 2]] + byteToHex[arr[offset2 + 3]] + "-" + byteToHex[arr[offset2 + 4]] + byteToHex[arr[offset2 + 5]] + "-" + byteToHex[arr[offset2 + 6]] + byteToHex[arr[offset2 + 7]] + "-" + byteToHex[arr[offset2 + 8]] + byteToHex[arr[offset2 + 9]] + "-" + byteToHex[arr[offset2 + 10]] + byteToHex[arr[offset2 + 11]] + byteToHex[arr[offset2 + 12]] + byteToHex[arr[offset2 + 13]] + byteToHex[arr[offset2 + 14]] + byteToHex[arr[offset2 + 15]]).toLowerCase();
  if (!validate(uuid2)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid2;
}
var _nodeId;
var _clockseq;
var _lastMSecs = 0;
var _lastNSecs = 0;
function v1(options, buf, offset2) {
  var i = buf && offset2 || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  var tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify(b);
}
function parse(uuid2) {
  if (!validate(uuid2)) {
    throw TypeError("Invalid UUID");
  }
  var v;
  var arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid2.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid2.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid2.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid2.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid2.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  var bytes = [];
  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset2) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset2 = offset2 || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset2 + i] = bytes[i];
      }
      return buf;
    }
    return stringify(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
function md5(bytes) {
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = "0123456789abcdef";
  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 255;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 255) << i % 32;
  }
  return output;
}
function safeAdd(x, y) {
  var lsw = (x & 65535) + (y & 65535);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var v3 = v35("v3", 48, md5);
function v4(options, buf, offset2) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset2 = offset2 || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset2 + i] = rnds[i];
    }
    return buf;
  }
  return stringify(rnds);
}
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  var K = [1518500249, 1859775393, 2400959708, 3395469782];
  var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var v5 = v35("v5", 80, sha1);
var uuid = {
  v1,
  v3,
  v4,
  v5
};
//! moment.js
//! version : 2.30.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var hookCallback;
function hooks() {
  return hookCallback.apply(null, arguments);
}
function setHookCallback(callback) {
  hookCallback = callback;
}
function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
}
function isObject(input) {
  return input != null && Object.prototype.toString.call(input) === "[object Object]";
}
function hasOwnProp(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
function isObjectEmpty(obj) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj).length === 0;
  } else {
    var k;
    for (k in obj) {
      if (hasOwnProp(obj, k)) {
        return false;
      }
    }
    return true;
  }
}
function isUndefined(input) {
  return input === void 0;
}
function isNumber(input) {
  return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
}
function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
function map(arr, fn) {
  var res = [], i, arrLen = arr.length;
  for (i = 0; i < arrLen; ++i) {
    res.push(fn(arr[i], i));
  }
  return res;
}
function extend(a, b) {
  for (var i in b) {
    if (hasOwnProp(b, i)) {
      a[i] = b[i];
    }
  }
  if (hasOwnProp(b, "toString")) {
    a.toString = b.toString;
  }
  if (hasOwnProp(b, "valueOf")) {
    a.valueOf = b.valueOf;
  }
  return a;
}
function createUTC(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, true).utc();
}
function defaultParsingFlags() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function getParsingFlags(m) {
  if (m._pf == null) {
    m._pf = defaultParsingFlags();
  }
  return m._pf;
}
var some;
if (Array.prototype.some) {
  some = Array.prototype.some;
} else {
  some = function(fun) {
    var t = Object(this), len = t.length >>> 0, i;
    for (i = 0; i < len; i++) {
      if (i in t && fun.call(this, t[i], i, t)) {
        return true;
      }
    }
    return false;
  };
}
function isValid(m) {
  var flags = null, parsedParts = false, isNowValid = m._d && !isNaN(m._d.getTime());
  if (isNowValid) {
    flags = getParsingFlags(m);
    parsedParts = some.call(flags.parsedDateParts, function(i) {
      return i != null;
    });
    isNowValid = flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
    if (m._strict) {
      isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
    }
  }
  if (Object.isFrozen == null || !Object.isFrozen(m)) {
    m._isValid = isNowValid;
  } else {
    return isNowValid;
  }
  return m._isValid;
}
function createInvalid(flags) {
  var m = createUTC(NaN);
  if (flags != null) {
    extend(getParsingFlags(m), flags);
  } else {
    getParsingFlags(m).userInvalidated = true;
  }
  return m;
}
var momentProperties = hooks.momentProperties = [], updateInProgress = false;
function copyConfig(to2, from2) {
  var i, prop, val, momentPropertiesLen = momentProperties.length;
  if (!isUndefined(from2._isAMomentObject)) {
    to2._isAMomentObject = from2._isAMomentObject;
  }
  if (!isUndefined(from2._i)) {
    to2._i = from2._i;
  }
  if (!isUndefined(from2._f)) {
    to2._f = from2._f;
  }
  if (!isUndefined(from2._l)) {
    to2._l = from2._l;
  }
  if (!isUndefined(from2._strict)) {
    to2._strict = from2._strict;
  }
  if (!isUndefined(from2._tzm)) {
    to2._tzm = from2._tzm;
  }
  if (!isUndefined(from2._isUTC)) {
    to2._isUTC = from2._isUTC;
  }
  if (!isUndefined(from2._offset)) {
    to2._offset = from2._offset;
  }
  if (!isUndefined(from2._pf)) {
    to2._pf = getParsingFlags(from2);
  }
  if (!isUndefined(from2._locale)) {
    to2._locale = from2._locale;
  }
  if (momentPropertiesLen > 0) {
    for (i = 0; i < momentPropertiesLen; i++) {
      prop = momentProperties[i];
      val = from2[prop];
      if (!isUndefined(val)) {
        to2[prop] = val;
      }
    }
  }
  return to2;
}
function Moment(config) {
  copyConfig(this, config);
  this._d = new Date(config._d != null ? config._d.getTime() : NaN);
  if (!this.isValid()) {
    this._d = /* @__PURE__ */ new Date(NaN);
  }
  if (updateInProgress === false) {
    updateInProgress = true;
    hooks.updateOffset(this);
    updateInProgress = false;
  }
}
function isMoment(obj) {
  return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
}
function warn(msg) {
  if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
    console.warn("Deprecation warning: " + msg);
  }
}
function deprecate(msg, fn) {
  var firstTime = true;
  return extend(function() {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(null, msg);
    }
    if (firstTime) {
      var args = [], arg, i, key, argLen = arguments.length;
      for (i = 0; i < argLen; i++) {
        arg = "";
        if (typeof arguments[i] === "object") {
          arg += "\n[" + i + "] ";
          for (key in arguments[0]) {
            if (hasOwnProp(arguments[0], key)) {
              arg += key + ": " + arguments[0][key] + ", ";
            }
          }
          arg = arg.slice(0, -2);
        } else {
          arg = arguments[i];
        }
        args.push(arg);
      }
      warn(
        msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
      );
      firstTime = false;
    }
    return fn.apply(this, arguments);
  }, fn);
}
var deprecations = {};
function deprecateSimple(name, msg) {
  if (hooks.deprecationHandler != null) {
    hooks.deprecationHandler(name, msg);
  }
  if (!deprecations[name]) {
    warn(msg);
    deprecations[name] = true;
  }
}
hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;
function isFunction(input) {
  return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
}
function set(config) {
  var prop, i;
  for (i in config) {
    if (hasOwnProp(config, i)) {
      prop = config[i];
      if (isFunction(prop)) {
        this[i] = prop;
      } else {
        this["_" + i] = prop;
      }
    }
  }
  this._config = config;
  this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function mergeConfigs(parentConfig, childConfig) {
  var res = extend({}, parentConfig), prop;
  for (prop in childConfig) {
    if (hasOwnProp(childConfig, prop)) {
      if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
        res[prop] = {};
        extend(res[prop], parentConfig[prop]);
        extend(res[prop], childConfig[prop]);
      } else if (childConfig[prop] != null) {
        res[prop] = childConfig[prop];
      } else {
        delete res[prop];
      }
    }
  }
  for (prop in parentConfig) {
    if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
      res[prop] = extend({}, res[prop]);
    }
  }
  return res;
}
function Locale(config) {
  if (config != null) {
    this.set(config);
  }
}
var keys;
if (Object.keys) {
  keys = Object.keys;
} else {
  keys = function(obj) {
    var i, res = [];
    for (i in obj) {
      if (hasOwnProp(obj, i)) {
        res.push(i);
      }
    }
    return res;
  };
}
var defaultCalendar = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function calendar(key, mom, now2) {
  var output = this._calendar[key] || this._calendar["sameElse"];
  return isFunction(output) ? output.call(mom, now2) : output;
}
function zeroFill(number, targetLength, forceSign) {
  var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
  return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(token2, padded, ordinal2, callback) {
  var func = callback;
  if (typeof callback === "string") {
    func = function() {
      return this[callback]();
    };
  }
  if (token2) {
    formatTokenFunctions[token2] = func;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function() {
      return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
    };
  }
  if (ordinal2) {
    formatTokenFunctions[ordinal2] = function() {
      return this.localeData().ordinal(
        func.apply(this, arguments),
        token2
      );
    };
  }
}
function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function makeFormatFunction(format2) {
  var array = format2.match(formattingTokens), i, length;
  for (i = 0, length = array.length; i < length; i++) {
    if (formatTokenFunctions[array[i]]) {
      array[i] = formatTokenFunctions[array[i]];
    } else {
      array[i] = removeFormattingTokens(array[i]);
    }
  }
  return function(mom) {
    var output = "", i2;
    for (i2 = 0; i2 < length; i2++) {
      output += isFunction(array[i2]) ? array[i2].call(mom, format2) : array[i2];
    }
    return output;
  };
}
function formatMoment(m, format2) {
  if (!m.isValid()) {
    return m.localeData().invalidDate();
  }
  format2 = expandFormat(format2, m.localeData());
  formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
  return formatFunctions[format2](m);
}
function expandFormat(format2, locale2) {
  var i = 5;
  function replaceLongDateFormatTokens(input) {
    return locale2.longDateFormat(input) || input;
  }
  localFormattingTokens.lastIndex = 0;
  while (i >= 0 && localFormattingTokens.test(format2)) {
    format2 = format2.replace(
      localFormattingTokens,
      replaceLongDateFormatTokens
    );
    localFormattingTokens.lastIndex = 0;
    i -= 1;
  }
  return format2;
}
var defaultLongDateFormat = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function longDateFormat(key) {
  var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
  if (format2 || !formatUpper) {
    return format2;
  }
  this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
    if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
      return tok.slice(1);
    }
    return tok;
  }).join("");
  return this._longDateFormat[key];
}
var defaultInvalidDate = "Invalid date";
function invalidDate() {
  return this._invalidDate;
}
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(number) {
  return this._ordinal.replace("%d", number);
}
var defaultRelativeTime = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function relativeTime(number, withoutSuffix, string, isFuture) {
  var output = this._relativeTime[string];
  return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
}
function pastFuture(diff2, output) {
  var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
  return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
}
var aliases = {
  D: "date",
  dates: "date",
  date: "date",
  d: "day",
  days: "day",
  day: "day",
  e: "weekday",
  weekdays: "weekday",
  weekday: "weekday",
  E: "isoWeekday",
  isoweekdays: "isoWeekday",
  isoweekday: "isoWeekday",
  DDD: "dayOfYear",
  dayofyears: "dayOfYear",
  dayofyear: "dayOfYear",
  h: "hour",
  hours: "hour",
  hour: "hour",
  ms: "millisecond",
  milliseconds: "millisecond",
  millisecond: "millisecond",
  m: "minute",
  minutes: "minute",
  minute: "minute",
  M: "month",
  months: "month",
  month: "month",
  Q: "quarter",
  quarters: "quarter",
  quarter: "quarter",
  s: "second",
  seconds: "second",
  second: "second",
  gg: "weekYear",
  weekyears: "weekYear",
  weekyear: "weekYear",
  GG: "isoWeekYear",
  isoweekyears: "isoWeekYear",
  isoweekyear: "isoWeekYear",
  w: "week",
  weeks: "week",
  week: "week",
  W: "isoWeek",
  isoweeks: "isoWeek",
  isoweek: "isoWeek",
  y: "year",
  years: "year",
  year: "year"
};
function normalizeUnits(units) {
  return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
}
function normalizeObjectUnits(inputObject) {
  var normalizedInput = {}, normalizedProp, prop;
  for (prop in inputObject) {
    if (hasOwnProp(inputObject, prop)) {
      normalizedProp = normalizeUnits(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }
  return normalizedInput;
}
var priorities = {
  date: 9,
  day: 11,
  weekday: 11,
  isoWeekday: 11,
  dayOfYear: 4,
  hour: 13,
  millisecond: 16,
  minute: 14,
  month: 8,
  quarter: 7,
  second: 15,
  weekYear: 1,
  isoWeekYear: 1,
  week: 5,
  isoWeek: 5,
  year: 1
};
function getPrioritizedUnits(unitsObj) {
  var units = [], u;
  for (u in unitsObj) {
    if (hasOwnProp(unitsObj, u)) {
      units.push({ unit: u, priority: priorities[u] });
    }
  }
  units.sort(function(a, b) {
    return a.priority - b.priority;
  });
  return units;
}
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, match1to2NoLeadingZero = /^[1-9]\d?/, match1to2HasZero = /^([1-9]\d|\d)/, regexes;
regexes = {};
function addRegexToken(token2, regex, strictRegex) {
  regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
    return isStrict && strictRegex ? strictRegex : regex;
  };
}
function getParseRegexForToken(token2, config) {
  if (!hasOwnProp(regexes, token2)) {
    return new RegExp(unescapeFormat(token2));
  }
  return regexes[token2](config._strict, config._locale);
}
function unescapeFormat(s) {
  return regexEscape(
    s.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
      }
    )
  );
}
function regexEscape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function absFloor(number) {
  if (number < 0) {
    return Math.ceil(number) || 0;
  } else {
    return Math.floor(number);
  }
}
function toInt(argumentForCoercion) {
  var coercedNumber = +argumentForCoercion, value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }
  return value;
}
var tokens = {};
function addParseToken(token2, callback) {
  var i, func = callback, tokenLen;
  if (typeof token2 === "string") {
    token2 = [token2];
  }
  if (isNumber(callback)) {
    func = function(input, array) {
      array[callback] = toInt(input);
    };
  }
  tokenLen = token2.length;
  for (i = 0; i < tokenLen; i++) {
    tokens[token2[i]] = func;
  }
}
function addWeekParseToken(token2, callback) {
  addParseToken(token2, function(input, array, config, token3) {
    config._w = config._w || {};
    callback(input, config._w, config, token3);
  });
}
function addTimeToArrayFromToken(token2, input, config) {
  if (input != null && hasOwnProp(tokens, token2)) {
    tokens[token2](input, config._a, config, token2);
  }
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
addFormatToken("Y", 0, 0, function() {
  var y = this.year();
  return y <= 9999 ? zeroFill(y, 4) : "+" + y;
});
addFormatToken(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
addFormatToken(0, ["YYYY", 4], 0, "year");
addFormatToken(0, ["YYYYY", 5], 0, "year");
addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
addRegexToken("Y", matchSigned);
addRegexToken("YY", match1to2, match2);
addRegexToken("YYYY", match1to4, match4);
addRegexToken("YYYYY", match1to6, match6);
addRegexToken("YYYYYY", match1to6, match6);
addParseToken(["YYYYY", "YYYYYY"], YEAR);
addParseToken("YYYY", function(input, array) {
  array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken("YY", function(input, array) {
  array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken("Y", function(input, array) {
  array[YEAR] = parseInt(input, 10);
});
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
hooks.parseTwoDigitYear = function(input) {
  return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
};
var getSetYear = makeGetSet("FullYear", true);
function getIsLeapYear() {
  return isLeapYear(this.year());
}
function makeGetSet(unit, keepTime) {
  return function(value) {
    if (value != null) {
      set$1(this, unit, value);
      hooks.updateOffset(this, keepTime);
      return this;
    } else {
      return get(this, unit);
    }
  };
}
function get(mom, unit) {
  if (!mom.isValid()) {
    return NaN;
  }
  var d = mom._d, isUTC = mom._isUTC;
  switch (unit) {
    case "Milliseconds":
      return isUTC ? d.getUTCMilliseconds() : d.getMilliseconds();
    case "Seconds":
      return isUTC ? d.getUTCSeconds() : d.getSeconds();
    case "Minutes":
      return isUTC ? d.getUTCMinutes() : d.getMinutes();
    case "Hours":
      return isUTC ? d.getUTCHours() : d.getHours();
    case "Date":
      return isUTC ? d.getUTCDate() : d.getDate();
    case "Day":
      return isUTC ? d.getUTCDay() : d.getDay();
    case "Month":
      return isUTC ? d.getUTCMonth() : d.getMonth();
    case "FullYear":
      return isUTC ? d.getUTCFullYear() : d.getFullYear();
    default:
      return NaN;
  }
}
function set$1(mom, unit, value) {
  var d, isUTC, year, month, date;
  if (!mom.isValid() || isNaN(value)) {
    return;
  }
  d = mom._d;
  isUTC = mom._isUTC;
  switch (unit) {
    case "Milliseconds":
      return void (isUTC ? d.setUTCMilliseconds(value) : d.setMilliseconds(value));
    case "Seconds":
      return void (isUTC ? d.setUTCSeconds(value) : d.setSeconds(value));
    case "Minutes":
      return void (isUTC ? d.setUTCMinutes(value) : d.setMinutes(value));
    case "Hours":
      return void (isUTC ? d.setUTCHours(value) : d.setHours(value));
    case "Date":
      return void (isUTC ? d.setUTCDate(value) : d.setDate(value));
    case "FullYear":
      break;
    default:
      return;
  }
  year = value;
  month = mom.month();
  date = mom.date();
  date = date === 29 && month === 1 && !isLeapYear(year) ? 28 : date;
  void (isUTC ? d.setUTCFullYear(year, month, date) : d.setFullYear(year, month, date));
}
function stringGet(units) {
  units = normalizeUnits(units);
  if (isFunction(this[units])) {
    return this[units]();
  }
  return this;
}
function stringSet(units, value) {
  if (typeof units === "object") {
    units = normalizeObjectUnits(units);
    var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
    for (i = 0; i < prioritizedLen; i++) {
      this[prioritized[i].unit](units[prioritized[i].unit]);
    }
  } else {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units](value);
    }
  }
  return this;
}
function mod(n, x) {
  return (n % x + x) % x;
}
var indexOf;
if (Array.prototype.indexOf) {
  indexOf = Array.prototype.indexOf;
} else {
  indexOf = function(o) {
    var i;
    for (i = 0; i < this.length; ++i) {
      if (this[i] === o) {
        return i;
      }
    }
    return -1;
  };
}
function daysInMonth(year, month) {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  var modMonth = mod(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
}
addFormatToken("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
addFormatToken("MMM", 0, 0, function(format2) {
  return this.localeData().monthsShort(this, format2);
});
addFormatToken("MMMM", 0, 0, function(format2) {
  return this.localeData().months(this, format2);
});
addRegexToken("M", match1to2, match1to2NoLeadingZero);
addRegexToken("MM", match1to2, match2);
addRegexToken("MMM", function(isStrict, locale2) {
  return locale2.monthsShortRegex(isStrict);
});
addRegexToken("MMMM", function(isStrict, locale2) {
  return locale2.monthsRegex(isStrict);
});
addParseToken(["M", "MM"], function(input, array) {
  array[MONTH] = toInt(input) - 1;
});
addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
  var month = config._locale.monthsParse(input, token2, config._strict);
  if (month != null) {
    array[MONTH] = month;
  } else {
    getParsingFlags(config).invalidMonth = input;
  }
});
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
function localeMonths(m, format2) {
  if (!m) {
    return isArray(this._months) ? this._months : this._months["standalone"];
  }
  return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
}
function localeMonthsShort(m, format2) {
  if (!m) {
    return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
  }
  return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
}
function handleStrictParse(monthName, format2, strict) {
  var i, ii, mom, llc = monthName.toLocaleLowerCase();
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (i = 0; i < 12; ++i) {
      mom = createUTC([2e3, i]);
      this._shortMonthsParse[i] = this.monthsShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeMonthsParse(monthName, format2, strict) {
  var i, mom, regex;
  if (this._monthsParseExact) {
    return handleStrictParse.call(this, monthName, format2, strict);
  }
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }
  for (i = 0; i < 12; i++) {
    mom = createUTC([2e3, i]);
    if (strict && !this._longMonthsParse[i]) {
      this._longMonthsParse[i] = new RegExp(
        "^" + this.months(mom, "").replace(".", "") + "$",
        "i"
      );
      this._shortMonthsParse[i] = new RegExp(
        "^" + this.monthsShort(mom, "").replace(".", "") + "$",
        "i"
      );
    }
    if (!strict && !this._monthsParse[i]) {
      regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
      this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
      return i;
    } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
      return i;
    } else if (!strict && this._monthsParse[i].test(monthName)) {
      return i;
    }
  }
}
function setMonth(mom, value) {
  if (!mom.isValid()) {
    return mom;
  }
  if (typeof value === "string") {
    if (/^\d+$/.test(value)) {
      value = toInt(value);
    } else {
      value = mom.localeData().monthsParse(value);
      if (!isNumber(value)) {
        return mom;
      }
    }
  }
  var month = value, date = mom.date();
  date = date < 29 ? date : Math.min(date, daysInMonth(mom.year(), month));
  void (mom._isUTC ? mom._d.setUTCMonth(month, date) : mom._d.setMonth(month, date));
  return mom;
}
function getSetMonth(value) {
  if (value != null) {
    setMonth(this, value);
    hooks.updateOffset(this, true);
    return this;
  } else {
    return get(this, "Month");
  }
}
function getDaysInMonth() {
  return daysInMonth(this.year(), this.month());
}
function monthsShortRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    } else {
      return this._monthsShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsShortRegex")) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }
    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }
}
function monthsRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    } else {
      return this._monthsRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsRegex")) {
      this._monthsRegex = defaultMonthsRegex;
    }
    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  }
}
function computeMonthsParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var shortPieces = [], longPieces = [], mixedPieces = [], i, mom, shortP, longP;
  for (i = 0; i < 12; i++) {
    mom = createUTC([2e3, i]);
    shortP = regexEscape(this.monthsShort(mom, ""));
    longP = regexEscape(this.months(mom, ""));
    shortPieces.push(shortP);
    longPieces.push(longP);
    mixedPieces.push(longP);
    mixedPieces.push(shortP);
  }
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._monthsShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
}
function createDate(y, m, d, h, M, s, ms) {
  var date;
  if (y < 100 && y >= 0) {
    date = new Date(y + 400, m, d, h, M, s, ms);
    if (isFinite(date.getFullYear())) {
      date.setFullYear(y);
    }
  } else {
    date = new Date(y, m, d, h, M, s, ms);
  }
  return date;
}
function createUTCDate(y) {
  var date, args;
  if (y < 100 && y >= 0) {
    args = Array.prototype.slice.call(arguments);
    args[0] = y + 400;
    date = new Date(Date.UTC.apply(null, args));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y);
    }
  } else {
    date = new Date(Date.UTC.apply(null, arguments));
  }
  return date;
}
function firstWeekOffset(year, dow, doy) {
  var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
  var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
  if (dayOfYear <= 0) {
    resYear = year - 1;
    resDayOfYear = daysInYear(resYear) + dayOfYear;
  } else if (dayOfYear > daysInYear(year)) {
    resYear = year + 1;
    resDayOfYear = dayOfYear - daysInYear(year);
  } else {
    resYear = year;
    resDayOfYear = dayOfYear;
  }
  return {
    year: resYear,
    dayOfYear: resDayOfYear
  };
}
function weekOfYear(mom, dow, doy) {
  var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
  if (week < 1) {
    resYear = mom.year() - 1;
    resWeek = week + weeksInYear(resYear, dow, doy);
  } else if (week > weeksInYear(mom.year(), dow, doy)) {
    resWeek = week - weeksInYear(mom.year(), dow, doy);
    resYear = mom.year() + 1;
  } else {
    resYear = mom.year();
    resWeek = week;
  }
  return {
    week: resWeek,
    year: resYear
  };
}
function weeksInYear(year, dow, doy) {
  var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
  return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
addRegexToken("w", match1to2, match1to2NoLeadingZero);
addRegexToken("ww", match1to2, match2);
addRegexToken("W", match1to2, match1to2NoLeadingZero);
addRegexToken("WW", match1to2, match2);
addWeekParseToken(
  ["w", "ww", "W", "WW"],
  function(input, week, config, token2) {
    week[token2.substr(0, 1)] = toInt(input);
  }
);
function localeWeek(mom) {
  return weekOfYear(mom, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function localeFirstDayOfWeek() {
  return this._week.dow;
}
function localeFirstDayOfYear() {
  return this._week.doy;
}
function getSetWeek(input) {
  var week = this.localeData().week(this);
  return input == null ? week : this.add((input - week) * 7, "d");
}
function getSetISOWeek(input) {
  var week = weekOfYear(this, 1, 4).week;
  return input == null ? week : this.add((input - week) * 7, "d");
}
addFormatToken("d", 0, "do", "day");
addFormatToken("dd", 0, 0, function(format2) {
  return this.localeData().weekdaysMin(this, format2);
});
addFormatToken("ddd", 0, 0, function(format2) {
  return this.localeData().weekdaysShort(this, format2);
});
addFormatToken("dddd", 0, 0, function(format2) {
  return this.localeData().weekdays(this, format2);
});
addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");
addRegexToken("d", match1to2);
addRegexToken("e", match1to2);
addRegexToken("E", match1to2);
addRegexToken("dd", function(isStrict, locale2) {
  return locale2.weekdaysMinRegex(isStrict);
});
addRegexToken("ddd", function(isStrict, locale2) {
  return locale2.weekdaysShortRegex(isStrict);
});
addRegexToken("dddd", function(isStrict, locale2) {
  return locale2.weekdaysRegex(isStrict);
});
addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
  var weekday = config._locale.weekdaysParse(input, token2, config._strict);
  if (weekday != null) {
    week.d = weekday;
  } else {
    getParsingFlags(config).invalidWeekday = input;
  }
});
addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
  week[token2] = toInt(input);
});
function parseWeekday(input, locale2) {
  if (typeof input !== "string") {
    return input;
  }
  if (!isNaN(input)) {
    return parseInt(input, 10);
  }
  input = locale2.weekdaysParse(input);
  if (typeof input === "number") {
    return input;
  }
  return null;
}
function parseIsoWeekday(input, locale2) {
  if (typeof input === "string") {
    return locale2.weekdaysParse(input) % 7 || 7;
  }
  return isNaN(input) ? null : input;
}
function shiftWeekdays(ws, n) {
  return ws.slice(n, 7).concat(ws.slice(0, n));
}
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
function localeWeekdays(m, format2) {
  var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
  return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
}
function localeWeekdaysShort(m) {
  return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}
function localeWeekdaysMin(m) {
  return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}
function handleStrictParse$1(weekdayName, format2, strict) {
  var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._minWeekdaysParse = [];
    for (i = 0; i < 7; ++i) {
      mom = createUTC([2e3, 1]).day(i);
      this._minWeekdaysParse[i] = this.weekdaysMin(
        mom,
        ""
      ).toLocaleLowerCase();
      this._shortWeekdaysParse[i] = this.weekdaysShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeWeekdaysParse(weekdayName, format2, strict) {
  var i, mom, regex;
  if (this._weekdaysParseExact) {
    return handleStrictParse$1.call(this, weekdayName, format2, strict);
  }
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._minWeekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._fullWeekdaysParse = [];
  }
  for (i = 0; i < 7; i++) {
    mom = createUTC([2e3, 1]).day(i);
    if (strict && !this._fullWeekdaysParse[i]) {
      this._fullWeekdaysParse[i] = new RegExp(
        "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._shortWeekdaysParse[i] = new RegExp(
        "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._minWeekdaysParse[i] = new RegExp(
        "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
    }
    if (!this._weekdaysParse[i]) {
      regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
      this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
      return i;
    } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
      return i;
    }
  }
}
function getSetDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var day = get(this, "Day");
  if (input != null) {
    input = parseWeekday(input, this.localeData());
    return this.add(input - day, "d");
  } else {
    return day;
  }
}
function getSetLocaleDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return input == null ? weekday : this.add(input - weekday, "d");
}
function getSetISODayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    var weekday = parseIsoWeekday(input, this.localeData());
    return this.day(this.day() % 7 ? weekday : weekday - 7);
  } else {
    return this.day() || 7;
  }
}
function weekdaysRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysStrictRegex;
    } else {
      return this._weekdaysRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      this._weekdaysRegex = defaultWeekdaysRegex;
    }
    return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
  }
}
function weekdaysShortRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysShortStrictRegex;
    } else {
      return this._weekdaysShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysShortRegex")) {
      this._weekdaysShortRegex = defaultWeekdaysShortRegex;
    }
    return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  }
}
function weekdaysMinRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysMinStrictRegex;
    } else {
      return this._weekdaysMinRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysMinRegex")) {
      this._weekdaysMinRegex = defaultWeekdaysMinRegex;
    }
    return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  }
}
function computeWeekdaysParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
  for (i = 0; i < 7; i++) {
    mom = createUTC([2e3, 1]).day(i);
    minp = regexEscape(this.weekdaysMin(mom, ""));
    shortp = regexEscape(this.weekdaysShort(mom, ""));
    longp = regexEscape(this.weekdays(mom, ""));
    minPieces.push(minp);
    shortPieces.push(shortp);
    longPieces.push(longp);
    mixedPieces.push(minp);
    mixedPieces.push(shortp);
    mixedPieces.push(longp);
  }
  minPieces.sort(cmpLenRev);
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._weekdaysShortRegex = this._weekdaysRegex;
  this._weekdaysMinRegex = this._weekdaysRegex;
  this._weekdaysStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._weekdaysShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
  this._weekdaysMinStrictRegex = new RegExp(
    "^(" + minPieces.join("|") + ")",
    "i"
  );
}
function hFormat() {
  return this.hours() % 12 || 12;
}
function kFormat() {
  return this.hours() || 24;
}
addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, hFormat);
addFormatToken("k", ["kk", 2], 0, kFormat);
addFormatToken("hmm", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});
addFormatToken("hmmss", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
addFormatToken("Hmm", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2);
});
addFormatToken("Hmmss", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
function meridiem(token2, lowercase) {
  addFormatToken(token2, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      lowercase
    );
  });
}
meridiem("a", true);
meridiem("A", false);
function matchMeridiem(isStrict, locale2) {
  return locale2._meridiemParse;
}
addRegexToken("a", matchMeridiem);
addRegexToken("A", matchMeridiem);
addRegexToken("H", match1to2, match1to2HasZero);
addRegexToken("h", match1to2, match1to2NoLeadingZero);
addRegexToken("k", match1to2, match1to2NoLeadingZero);
addRegexToken("HH", match1to2, match2);
addRegexToken("hh", match1to2, match2);
addRegexToken("kk", match1to2, match2);
addRegexToken("hmm", match3to4);
addRegexToken("hmmss", match5to6);
addRegexToken("Hmm", match3to4);
addRegexToken("Hmmss", match5to6);
addParseToken(["H", "HH"], HOUR);
addParseToken(["k", "kk"], function(input, array, config) {
  var kInput = toInt(input);
  array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(["a", "A"], function(input, array, config) {
  config._isPm = config._locale.isPM(input);
  config._meridiem = input;
});
addParseToken(["h", "hh"], function(input, array, config) {
  array[HOUR] = toInt(input);
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
  getParsingFlags(config).bigHour = true;
});
addParseToken("Hmm", function(input, array, config) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
});
addParseToken("Hmmss", function(input, array, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
});
function localeIsPM(input) {
  return (input + "").toLowerCase().charAt(0) === "p";
}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
function localeMeridiem(hours2, minutes2, isLower) {
  if (hours2 > 11) {
    return isLower ? "pm" : "PM";
  } else {
    return isLower ? "am" : "AM";
  }
}
var baseConfig = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,
  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,
  week: defaultLocaleWeek,
  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,
  meridiemParse: defaultLocaleMeridiemParse
};
var locales = {}, localeFamilies = {}, globalLocale;
function commonPrefix(arr1, arr2) {
  var i, minl = Math.min(arr1.length, arr2.length);
  for (i = 0; i < minl; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return i;
    }
  }
  return minl;
}
function normalizeLocale(key) {
  return key ? key.toLowerCase().replace("_", "-") : key;
}
function chooseLocale(names) {
  var i = 0, j, next, locale2, split;
  while (i < names.length) {
    split = normalizeLocale(names[i]).split("-");
    j = split.length;
    next = normalizeLocale(names[i + 1]);
    next = next ? next.split("-") : null;
    while (j > 0) {
      locale2 = loadLocale(split.slice(0, j).join("-"));
      if (locale2) {
        return locale2;
      }
      if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
        break;
      }
      j--;
    }
    i++;
  }
  return globalLocale;
}
function isLocaleNameSane(name) {
  return !!(name && name.match("^[^/\\\\]*$"));
}
function loadLocale(name) {
  var oldLocale = null, aliasedRequire;
  if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
    try {
      oldLocale = globalLocale._abbr;
      aliasedRequire = require;
      aliasedRequire("./locale/" + name);
      getSetGlobalLocale(oldLocale);
    } catch (e) {
      locales[name] = null;
    }
  }
  return locales[name];
}
function getSetGlobalLocale(key, values) {
  var data;
  if (key) {
    if (isUndefined(values)) {
      data = getLocale(key);
    } else {
      data = defineLocale(key, values);
    }
    if (data) {
      globalLocale = data;
    } else {
      if (typeof console !== "undefined" && console.warn) {
        console.warn(
          "Locale " + key + " not found. Did you forget to load it?"
        );
      }
    }
  }
  return globalLocale._abbr;
}
function defineLocale(name, config) {
  if (config !== null) {
    var locale2, parentConfig = baseConfig;
    config.abbr = name;
    if (locales[name] != null) {
      deprecateSimple(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      );
      parentConfig = locales[name]._config;
    } else if (config.parentLocale != null) {
      if (locales[config.parentLocale] != null) {
        parentConfig = locales[config.parentLocale]._config;
      } else {
        locale2 = loadLocale(config.parentLocale);
        if (locale2 != null) {
          parentConfig = locale2._config;
        } else {
          if (!localeFamilies[config.parentLocale]) {
            localeFamilies[config.parentLocale] = [];
          }
          localeFamilies[config.parentLocale].push({
            name,
            config
          });
          return null;
        }
      }
    }
    locales[name] = new Locale(mergeConfigs(parentConfig, config));
    if (localeFamilies[name]) {
      localeFamilies[name].forEach(function(x) {
        defineLocale(x.name, x.config);
      });
    }
    getSetGlobalLocale(name);
    return locales[name];
  } else {
    delete locales[name];
    return null;
  }
}
function updateLocale(name, config) {
  if (config != null) {
    var locale2, tmpLocale, parentConfig = baseConfig;
    if (locales[name] != null && locales[name].parentLocale != null) {
      locales[name].set(mergeConfigs(locales[name]._config, config));
    } else {
      tmpLocale = loadLocale(name);
      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }
      config = mergeConfigs(parentConfig, config);
      if (tmpLocale == null) {
        config.abbr = name;
      }
      locale2 = new Locale(config);
      locale2.parentLocale = locales[name];
      locales[name] = locale2;
    }
    getSetGlobalLocale(name);
  } else {
    if (locales[name] != null) {
      if (locales[name].parentLocale != null) {
        locales[name] = locales[name].parentLocale;
        if (name === getSetGlobalLocale()) {
          getSetGlobalLocale(name);
        }
      } else if (locales[name] != null) {
        delete locales[name];
      }
    }
  }
  return locales[name];
}
function getLocale(key) {
  var locale2;
  if (key && key._locale && key._locale._abbr) {
    key = key._locale._abbr;
  }
  if (!key) {
    return globalLocale;
  }
  if (!isArray(key)) {
    locale2 = loadLocale(key);
    if (locale2) {
      return locale2;
    }
    key = [key];
  }
  return chooseLocale(key);
}
function listLocales() {
  return keys(locales);
}
function checkOverflow(m) {
  var overflow, a = m._a;
  if (a && getParsingFlags(m).overflow === -2) {
    overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
    if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
      overflow = DATE;
    }
    if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
      overflow = WEEK;
    }
    if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
      overflow = WEEKDAY;
    }
    getParsingFlags(m).overflow = overflow;
  }
  return m;
}
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, false],
  ["YYYY", /\d{4}/, false]
], isoTimes = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function configFromISO(config) {
  var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
  if (match) {
    getParsingFlags(config).iso = true;
    for (i = 0, l = isoDatesLen; i < l; i++) {
      if (isoDates[i][1].exec(match[1])) {
        dateFormat = isoDates[i][0];
        allowTime = isoDates[i][2] !== false;
        break;
      }
    }
    if (dateFormat == null) {
      config._isValid = false;
      return;
    }
    if (match[3]) {
      for (i = 0, l = isoTimesLen; i < l; i++) {
        if (isoTimes[i][1].exec(match[3])) {
          timeFormat = (match[2] || " ") + isoTimes[i][0];
          break;
        }
      }
      if (timeFormat == null) {
        config._isValid = false;
        return;
      }
    }
    if (!allowTime && timeFormat != null) {
      config._isValid = false;
      return;
    }
    if (match[4]) {
      if (tzRegex.exec(match[4])) {
        tzFormat = "Z";
      } else {
        config._isValid = false;
        return;
      }
    }
    config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
    configFromStringAndFormat(config);
  } else {
    config._isValid = false;
  }
}
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = [
    untruncateYear(yearStr),
    defaultLocaleMonthsShort.indexOf(monthStr),
    parseInt(dayStr, 10),
    parseInt(hourStr, 10),
    parseInt(minuteStr, 10)
  ];
  if (secondStr) {
    result.push(parseInt(secondStr, 10));
  }
  return result;
}
function untruncateYear(yearStr) {
  var year = parseInt(yearStr, 10);
  if (year <= 49) {
    return 2e3 + year;
  } else if (year <= 999) {
    return 1900 + year;
  }
  return year;
}
function preprocessRFC2822(s) {
  return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function checkWeekday(weekdayStr, parsedInput, config) {
  if (weekdayStr) {
    var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
      parsedInput[0],
      parsedInput[1],
      parsedInput[2]
    ).getDay();
    if (weekdayProvided !== weekdayActual) {
      getParsingFlags(config).weekdayMismatch = true;
      config._isValid = false;
      return false;
    }
  }
  return true;
}
function calculateOffset(obsOffset, militaryOffset, numOffset) {
  if (obsOffset) {
    return obsOffsets[obsOffset];
  } else if (militaryOffset) {
    return 0;
  } else {
    var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
    return h * 60 + m;
  }
}
function configFromRFC2822(config) {
  var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
  if (match) {
    parsedArray = extractFromRFC2822Strings(
      match[4],
      match[3],
      match[2],
      match[5],
      match[6],
      match[7]
    );
    if (!checkWeekday(match[1], parsedArray, config)) {
      return;
    }
    config._a = parsedArray;
    config._tzm = calculateOffset(match[8], match[9], match[10]);
    config._d = createUTCDate.apply(null, config._a);
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    getParsingFlags(config).rfc2822 = true;
  } else {
    config._isValid = false;
  }
}
function configFromString(config) {
  var matched = aspNetJsonRegex.exec(config._i);
  if (matched !== null) {
    config._d = /* @__PURE__ */ new Date(+matched[1]);
    return;
  }
  configFromISO(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  configFromRFC2822(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  if (config._strict) {
    config._isValid = false;
  } else {
    hooks.createFromInputFallback(config);
  }
}
hooks.createFromInputFallback = deprecate(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(config) {
    config._d = /* @__PURE__ */ new Date(config._i + (config._useUTC ? " UTC" : ""));
  }
);
function defaults(a, b, c) {
  if (a != null) {
    return a;
  }
  if (b != null) {
    return b;
  }
  return c;
}
function currentDateArray(config) {
  var nowValue = new Date(hooks.now());
  if (config._useUTC) {
    return [
      nowValue.getUTCFullYear(),
      nowValue.getUTCMonth(),
      nowValue.getUTCDate()
    ];
  }
  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
function configFromArray(config) {
  var i, date, input = [], currentDate, expectedWeekday, yearToUse;
  if (config._d) {
    return;
  }
  currentDate = currentDateArray(config);
  if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
    dayOfYearFromWeekInfo(config);
  }
  if (config._dayOfYear != null) {
    yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
    if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
      getParsingFlags(config)._overflowDayOfYear = true;
    }
    date = createUTCDate(yearToUse, 0, config._dayOfYear);
    config._a[MONTH] = date.getUTCMonth();
    config._a[DATE] = date.getUTCDate();
  }
  for (i = 0; i < 3 && config._a[i] == null; ++i) {
    config._a[i] = input[i] = currentDate[i];
  }
  for (; i < 7; i++) {
    config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
  }
  if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
    config._nextDay = true;
    config._a[HOUR] = 0;
  }
  config._d = (config._useUTC ? createUTCDate : createDate).apply(
    null,
    input
  );
  expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
  if (config._tzm != null) {
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  }
  if (config._nextDay) {
    config._a[HOUR] = 24;
  }
  if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
    getParsingFlags(config).weekdayMismatch = true;
  }
}
function dayOfYearFromWeekInfo(config) {
  var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  w = config._w;
  if (w.GG != null || w.W != null || w.E != null) {
    dow = 1;
    doy = 4;
    weekYear = defaults(
      w.GG,
      config._a[YEAR],
      weekOfYear(createLocal(), 1, 4).year
    );
    week = defaults(w.W, 1);
    weekday = defaults(w.E, 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config._locale._week.dow;
    doy = config._locale._week.doy;
    curWeek = weekOfYear(createLocal(), dow, doy);
    weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
    week = defaults(w.w, curWeek.week);
    if (w.d != null) {
      weekday = w.d;
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w.e != null) {
      weekday = w.e + dow;
      if (w.e < 0 || w.e > 6) {
        weekdayOverflow = true;
      }
    } else {
      weekday = dow;
    }
  }
  if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
    getParsingFlags(config)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags(config)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }
}
hooks.ISO_8601 = function() {
};
hooks.RFC_2822 = function() {
};
function configFromStringAndFormat(config) {
  if (config._f === hooks.ISO_8601) {
    configFromISO(config);
    return;
  }
  if (config._f === hooks.RFC_2822) {
    configFromRFC2822(config);
    return;
  }
  config._a = [];
  getParsingFlags(config).empty = true;
  var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
  tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
  tokenLen = tokens2.length;
  for (i = 0; i < tokenLen; i++) {
    token2 = tokens2[i];
    parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
    if (parsedInput) {
      skipped = string.substr(0, string.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags(config).unusedInput.push(skipped);
      }
      string = string.slice(
        string.indexOf(parsedInput) + parsedInput.length
      );
      totalParsedInputLength += parsedInput.length;
    }
    if (formatTokenFunctions[token2]) {
      if (parsedInput) {
        getParsingFlags(config).empty = false;
      } else {
        getParsingFlags(config).unusedTokens.push(token2);
      }
      addTimeToArrayFromToken(token2, parsedInput, config);
    } else if (config._strict && !parsedInput) {
      getParsingFlags(config).unusedTokens.push(token2);
    }
  }
  getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
  if (string.length > 0) {
    getParsingFlags(config).unusedInput.push(string);
  }
  if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
    getParsingFlags(config).bigHour = void 0;
  }
  getParsingFlags(config).parsedDateParts = config._a.slice(0);
  getParsingFlags(config).meridiem = config._meridiem;
  config._a[HOUR] = meridiemFixWrap(
    config._locale,
    config._a[HOUR],
    config._meridiem
  );
  era = getParsingFlags(config).era;
  if (era !== null) {
    config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
  }
  configFromArray(config);
  checkOverflow(config);
}
function meridiemFixWrap(locale2, hour, meridiem2) {
  var isPm;
  if (meridiem2 == null) {
    return hour;
  }
  if (locale2.meridiemHour != null) {
    return locale2.meridiemHour(hour, meridiem2);
  } else if (locale2.isPM != null) {
    isPm = locale2.isPM(meridiem2);
    if (isPm && hour < 12) {
      hour += 12;
    }
    if (!isPm && hour === 12) {
      hour = 0;
    }
    return hour;
  } else {
    return hour;
  }
}
function configFromStringAndArray(config) {
  var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
  if (configfLen === 0) {
    getParsingFlags(config).invalidFormat = true;
    config._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (i = 0; i < configfLen; i++) {
    currentScore = 0;
    validFormatFound = false;
    tempConfig = copyConfig({}, config);
    if (config._useUTC != null) {
      tempConfig._useUTC = config._useUTC;
    }
    tempConfig._f = config._f[i];
    configFromStringAndFormat(tempConfig);
    if (isValid(tempConfig)) {
      validFormatFound = true;
    }
    currentScore += getParsingFlags(tempConfig).charsLeftOver;
    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
    getParsingFlags(tempConfig).score = currentScore;
    if (!bestFormatIsValid) {
      if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
        if (validFormatFound) {
          bestFormatIsValid = true;
        }
      }
    } else {
      if (currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
  }
  extend(config, bestMoment || tempConfig);
}
function configFromObject(config) {
  if (config._d) {
    return;
  }
  var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
  config._a = map(
    [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
    function(obj) {
      return obj && parseInt(obj, 10);
    }
  );
  configFromArray(config);
}
function createFromConfig(config) {
  var res = new Moment(checkOverflow(prepareConfig(config)));
  if (res._nextDay) {
    res.add(1, "d");
    res._nextDay = void 0;
  }
  return res;
}
function prepareConfig(config) {
  var input = config._i, format2 = config._f;
  config._locale = config._locale || getLocale(config._l);
  if (input === null || format2 === void 0 && input === "") {
    return createInvalid({ nullInput: true });
  }
  if (typeof input === "string") {
    config._i = input = config._locale.preparse(input);
  }
  if (isMoment(input)) {
    return new Moment(checkOverflow(input));
  } else if (isDate(input)) {
    config._d = input;
  } else if (isArray(format2)) {
    configFromStringAndArray(config);
  } else if (format2) {
    configFromStringAndFormat(config);
  } else {
    configFromInput(config);
  }
  if (!isValid(config)) {
    config._d = null;
  }
  return config;
}
function configFromInput(config) {
  var input = config._i;
  if (isUndefined(input)) {
    config._d = new Date(hooks.now());
  } else if (isDate(input)) {
    config._d = new Date(input.valueOf());
  } else if (typeof input === "string") {
    configFromString(config);
  } else if (isArray(input)) {
    config._a = map(input.slice(0), function(obj) {
      return parseInt(obj, 10);
    });
    configFromArray(config);
  } else if (isObject(input)) {
    configFromObject(config);
  } else if (isNumber(input)) {
    config._d = new Date(input);
  } else {
    hooks.createFromInputFallback(config);
  }
}
function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
  var c = {};
  if (format2 === true || format2 === false) {
    strict = format2;
    format2 = void 0;
  }
  if (locale2 === true || locale2 === false) {
    strict = locale2;
    locale2 = void 0;
  }
  if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
    input = void 0;
  }
  c._isAMomentObject = true;
  c._useUTC = c._isUTC = isUTC;
  c._l = locale2;
  c._i = input;
  c._f = format2;
  c._strict = strict;
  return createFromConfig(c);
}
function createLocal(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, false);
}
var prototypeMin = deprecate(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  }
), prototypeMax = deprecate(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  }
);
function pickBy(fn, moments) {
  var res, i;
  if (moments.length === 1 && isArray(moments[0])) {
    moments = moments[0];
  }
  if (!moments.length) {
    return createLocal();
  }
  res = moments[0];
  for (i = 1; i < moments.length; ++i) {
    if (!moments[i].isValid() || moments[i][fn](res)) {
      res = moments[i];
    }
  }
  return res;
}
function min() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isBefore", args);
}
function max() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isAfter", args);
}
var now = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
};
var ordering = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function isDurationValid(m) {
  var key, unitHasDecimal = false, i, orderLen = ordering.length;
  for (key in m) {
    if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
      return false;
    }
  }
  for (i = 0; i < orderLen; ++i) {
    if (m[ordering[i]]) {
      if (unitHasDecimal) {
        return false;
      }
      if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
        unitHasDecimal = true;
      }
    }
  }
  return true;
}
function isValid$1() {
  return this._isValid;
}
function createInvalid$1() {
  return createDuration(NaN);
}
function Duration(duration) {
  var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
  this._isValid = isDurationValid(normalizedInput);
  this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
  minutes2 * 6e4 + // 1000 * 60
  hours2 * 1e3 * 60 * 60;
  this._days = +days2 + weeks2 * 7;
  this._months = +months2 + quarters * 3 + years2 * 12;
  this._data = {};
  this._locale = getLocale();
  this._bubble();
}
function isDuration(obj) {
  return obj instanceof Duration;
}
function absRound(number) {
  if (number < 0) {
    return Math.round(-1 * number) * -1;
  } else {
    return Math.round(number);
  }
}
function compareArrays(array1, array2, dontConvert) {
  var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
  for (i = 0; i < len; i++) {
    if (toInt(array1[i]) !== toInt(array2[i])) {
      diffs++;
    }
  }
  return diffs + lengthDiff;
}
function offset(token2, separator) {
  addFormatToken(token2, 0, 0, function() {
    var offset2 = this.utcOffset(), sign2 = "+";
    if (offset2 < 0) {
      offset2 = -offset2;
      sign2 = "-";
    }
    return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
  });
}
offset("Z", ":");
offset("ZZ", "");
addRegexToken("Z", matchShortOffset);
addRegexToken("ZZ", matchShortOffset);
addParseToken(["Z", "ZZ"], function(input, array, config) {
  config._useUTC = true;
  config._tzm = offsetFromString(matchShortOffset, input);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher, string) {
  var matches = (string || "").match(matcher), chunk, parts, minutes2;
  if (matches === null) {
    return null;
  }
  chunk = matches[matches.length - 1] || [];
  parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
  minutes2 = +(parts[1] * 60) + toInt(parts[2]);
  return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
}
function cloneWithOffset(input, model) {
  var res, diff2;
  if (model._isUTC) {
    res = model.clone();
    diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
    res._d.setTime(res._d.valueOf() + diff2);
    hooks.updateOffset(res, false);
    return res;
  } else {
    return createLocal(input).local();
  }
}
function getDateOffset(m) {
  return -Math.round(m._d.getTimezoneOffset());
}
hooks.updateOffset = function() {
};
function getSetOffset(input, keepLocalTime, keepMinutes) {
  var offset2 = this._offset || 0, localAdjust;
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    if (typeof input === "string") {
      input = offsetFromString(matchShortOffset, input);
      if (input === null) {
        return this;
      }
    } else if (Math.abs(input) < 16 && !keepMinutes) {
      input = input * 60;
    }
    if (!this._isUTC && keepLocalTime) {
      localAdjust = getDateOffset(this);
    }
    this._offset = input;
    this._isUTC = true;
    if (localAdjust != null) {
      this.add(localAdjust, "m");
    }
    if (offset2 !== input) {
      if (!keepLocalTime || this._changeInProgress) {
        addSubtract(
          this,
          createDuration(input - offset2, "m"),
          1,
          false
        );
      } else if (!this._changeInProgress) {
        this._changeInProgress = true;
        hooks.updateOffset(this, true);
        this._changeInProgress = null;
      }
    }
    return this;
  } else {
    return this._isUTC ? offset2 : getDateOffset(this);
  }
}
function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== "string") {
      input = -input;
    }
    this.utcOffset(input, keepLocalTime);
    return this;
  } else {
    return -this.utcOffset();
  }
}
function setOffsetToUTC(keepLocalTime) {
  return this.utcOffset(0, keepLocalTime);
}
function setOffsetToLocal(keepLocalTime) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;
    if (keepLocalTime) {
      this.subtract(getDateOffset(this), "m");
    }
  }
  return this;
}
function setOffsetToParsedOffset() {
  if (this._tzm != null) {
    this.utcOffset(this._tzm, false, true);
  } else if (typeof this._i === "string") {
    var tZone = offsetFromString(matchOffset, this._i);
    if (tZone != null) {
      this.utcOffset(tZone);
    } else {
      this.utcOffset(0, true);
    }
  }
  return this;
}
function hasAlignedHourOffset(input) {
  if (!this.isValid()) {
    return false;
  }
  input = input ? createLocal(input).utcOffset() : 0;
  return (this.utcOffset() - input) % 60 === 0;
}
function isDaylightSavingTime() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }
  var c = {}, other;
  copyConfig(c, this);
  c = prepareConfig(c);
  if (c._a) {
    other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
    this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }
  return this._isDSTShifted;
}
function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}
function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}
function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(input, key) {
  var duration = input, match = null, sign2, ret, diffRes;
  if (isDuration(input)) {
    duration = {
      ms: input._milliseconds,
      d: input._days,
      M: input._months
    };
  } else if (isNumber(input) || !isNaN(+input)) {
    duration = {};
    if (key) {
      duration[key] = +input;
    } else {
      duration.milliseconds = +input;
    }
  } else if (match = aspNetRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: 0,
      d: toInt(match[DATE]) * sign2,
      h: toInt(match[HOUR]) * sign2,
      m: toInt(match[MINUTE]) * sign2,
      s: toInt(match[SECOND]) * sign2,
      ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
      // the millisecond decimal point is included in the match
    };
  } else if (match = isoRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: parseIso(match[2], sign2),
      M: parseIso(match[3], sign2),
      w: parseIso(match[4], sign2),
      d: parseIso(match[5], sign2),
      h: parseIso(match[6], sign2),
      m: parseIso(match[7], sign2),
      s: parseIso(match[8], sign2)
    };
  } else if (duration == null) {
    duration = {};
  } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
    diffRes = momentsDifference(
      createLocal(duration.from),
      createLocal(duration.to)
    );
    duration = {};
    duration.ms = diffRes.milliseconds;
    duration.M = diffRes.months;
  }
  ret = new Duration(duration);
  if (isDuration(input) && hasOwnProp(input, "_locale")) {
    ret._locale = input._locale;
  }
  if (isDuration(input) && hasOwnProp(input, "_isValid")) {
    ret._isValid = input._isValid;
  }
  return ret;
}
createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;
function parseIso(inp, sign2) {
  var res = inp && parseFloat(inp.replace(",", "."));
  return (isNaN(res) ? 0 : res) * sign2;
}
function positiveMomentsDifference(base, other) {
  var res = {};
  res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
  if (base.clone().add(res.months, "M").isAfter(other)) {
    --res.months;
  }
  res.milliseconds = +other - +base.clone().add(res.months, "M");
  return res;
}
function momentsDifference(base, other) {
  var res;
  if (!(base.isValid() && other.isValid())) {
    return { milliseconds: 0, months: 0 };
  }
  other = cloneWithOffset(other, base);
  if (base.isBefore(other)) {
    res = positiveMomentsDifference(base, other);
  } else {
    res = positiveMomentsDifference(other, base);
    res.milliseconds = -res.milliseconds;
    res.months = -res.months;
  }
  return res;
}
function createAdder(direction, name) {
  return function(val, period) {
    var dur, tmp;
    if (period !== null && !isNaN(+period)) {
      deprecateSimple(
        name,
        "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
      );
      tmp = val;
      val = period;
      period = tmp;
    }
    dur = createDuration(val, period);
    addSubtract(this, dur, direction);
    return this;
  };
}
function addSubtract(mom, duration, isAdding, updateOffset) {
  var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
  if (!mom.isValid()) {
    return;
  }
  updateOffset = updateOffset == null ? true : updateOffset;
  if (months2) {
    setMonth(mom, get(mom, "Month") + months2 * isAdding);
  }
  if (days2) {
    set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
  }
  if (milliseconds2) {
    mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
  }
  if (updateOffset) {
    hooks.updateOffset(mom, days2 || months2);
  }
}
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function isString(input) {
  return typeof input === "string" || input instanceof String;
}
function isMomentInput(input) {
  return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
}
function isMomentInputObject(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i, property, propertyLen = properties.length;
  for (i = 0; i < propertyLen; i += 1) {
    property = properties[i];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function isNumberOrStringArray(input) {
  var arrayTest = isArray(input), dataTypeTest = false;
  if (arrayTest) {
    dataTypeTest = input.filter(function(item) {
      return !isNumber(item) && isString(input);
    }).length === 0;
  }
  return arrayTest && dataTypeTest;
}
function isCalendarSpec(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i, property;
  for (i = 0; i < properties.length; i += 1) {
    property = properties[i];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function getCalendarFormat(myMoment, now2) {
  var diff2 = myMoment.diff(now2, "days", true);
  return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
}
function calendar$1(time, formats) {
  if (arguments.length === 1) {
    if (!arguments[0]) {
      time = void 0;
      formats = void 0;
    } else if (isMomentInput(arguments[0])) {
      time = arguments[0];
      formats = void 0;
    } else if (isCalendarSpec(arguments[0])) {
      formats = arguments[0];
      time = void 0;
    }
  }
  var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
  return this.format(
    output || this.localeData().calendar(format2, this, createLocal(now2))
  );
}
function clone() {
  return new Moment(this);
}
function isAfter(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() > localInput.valueOf();
  } else {
    return localInput.valueOf() < this.clone().startOf(units).valueOf();
  }
}
function isBefore(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() < localInput.valueOf();
  } else {
    return this.clone().endOf(units).valueOf() < localInput.valueOf();
  }
}
function isBetween(from2, to2, units, inclusivity) {
  var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
  if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
    return false;
  }
  inclusivity = inclusivity || "()";
  return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
}
function isSame(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input), inputMs;
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() === localInput.valueOf();
  } else {
    inputMs = localInput.valueOf();
    return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
  }
}
function isSameOrAfter(input, units) {
  return this.isSame(input, units) || this.isAfter(input, units);
}
function isSameOrBefore(input, units) {
  return this.isSame(input, units) || this.isBefore(input, units);
}
function diff(input, units, asFloat) {
  var that, zoneDelta, output;
  if (!this.isValid()) {
    return NaN;
  }
  that = cloneWithOffset(input, this);
  if (!that.isValid()) {
    return NaN;
  }
  zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  units = normalizeUnits(units);
  switch (units) {
    case "year":
      output = monthDiff(this, that) / 12;
      break;
    case "month":
      output = monthDiff(this, that);
      break;
    case "quarter":
      output = monthDiff(this, that) / 3;
      break;
    case "second":
      output = (this - that) / 1e3;
      break;
    case "minute":
      output = (this - that) / 6e4;
      break;
    case "hour":
      output = (this - that) / 36e5;
      break;
    case "day":
      output = (this - that - zoneDelta) / 864e5;
      break;
    case "week":
      output = (this - that - zoneDelta) / 6048e5;
      break;
    default:
      output = this - that;
  }
  return asFloat ? output : absFloor(output);
}
function monthDiff(a, b) {
  if (a.date() < b.date()) {
    return -monthDiff(b, a);
  }
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
  if (b - anchor < 0) {
    anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
    adjust = (b - anchor) / (anchor - anchor2);
  } else {
    anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
    adjust = (b - anchor) / (anchor2 - anchor);
  }
  return -(wholeMonthDiff + adjust) || 0;
}
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function toString() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function toISOString(keepOffset) {
  if (!this.isValid()) {
    return null;
  }
  var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
  if (m.year() < 0 || m.year() > 9999) {
    return formatMoment(
      m,
      utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
    );
  }
  if (isFunction(Date.prototype.toISOString)) {
    if (utc) {
      return this.toDate().toISOString();
    } else {
      return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
    }
  }
  return formatMoment(
    m,
    utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function inspect() {
  if (!this.isValid()) {
    return "moment.invalid(/* " + this._i + " */)";
  }
  var func = "moment", zone = "", prefix, year, datetime, suffix;
  if (!this.isLocal()) {
    func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
    zone = "Z";
  }
  prefix = "[" + func + '("]';
  year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
  datetime = "-MM-DD[T]HH:mm:ss.SSS";
  suffix = zone + '[")]';
  return this.format(prefix + year + datetime + suffix);
}
function format(inputString) {
  if (!inputString) {
    inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
  }
  var output = formatMoment(this, inputString);
  return this.localeData().postformat(output);
}
function from(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function fromNow(withoutSuffix) {
  return this.from(createLocal(), withoutSuffix);
}
function to(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function toNow(withoutSuffix) {
  return this.to(createLocal(), withoutSuffix);
}
function locale(key) {
  var newLocaleData;
  if (key === void 0) {
    return this._locale._abbr;
  } else {
    newLocaleData = getLocale(key);
    if (newLocaleData != null) {
      this._locale = newLocaleData;
    }
    return this;
  }
}
var lang = deprecate(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(key) {
    if (key === void 0) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  }
);
function localeData() {
  return this._locale;
}
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
function mod$1(dividend, divisor) {
  return (dividend % divisor + divisor) % divisor;
}
function localStartOfDate(y, m, d) {
  if (y < 100 && y >= 0) {
    return new Date(y + 400, m, d) - MS_PER_400_YEARS;
  } else {
    return new Date(y, m, d).valueOf();
  }
}
function utcStartOfDate(y, m, d) {
  if (y < 100 && y >= 0) {
    return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
  } else {
    return Date.UTC(y, m, d);
  }
}
function startOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year(), 0, 1);
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      time = startOfDate(this.year(), this.month(), 1);
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date());
      break;
    case "hour":
      time = this._d.valueOf();
      time -= mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      );
      break;
    case "minute":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_MINUTE);
      break;
    case "second":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_SECOND);
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function endOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      time = startOfDate(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      time = this._d.valueOf();
      time += MS_PER_HOUR - mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      ) - 1;
      break;
    case "minute":
      time = this._d.valueOf();
      time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
      break;
    case "second":
      time = this._d.valueOf();
      time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function valueOf() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function unix() {
  return Math.floor(this.valueOf() / 1e3);
}
function toDate() {
  return new Date(this.valueOf());
}
function toArray() {
  var m = this;
  return [
    m.year(),
    m.month(),
    m.date(),
    m.hour(),
    m.minute(),
    m.second(),
    m.millisecond()
  ];
}
function toObject() {
  var m = this;
  return {
    years: m.year(),
    months: m.month(),
    date: m.date(),
    hours: m.hours(),
    minutes: m.minutes(),
    seconds: m.seconds(),
    milliseconds: m.milliseconds()
  };
}
function toJSON() {
  return this.isValid() ? this.toISOString() : null;
}
function isValid$2() {
  return isValid(this);
}
function parsingFlags() {
  return extend({}, getParsingFlags(this));
}
function invalidAt() {
  return getParsingFlags(this).overflow;
}
function creationData() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
addFormatToken("N", 0, 0, "eraAbbr");
addFormatToken("NN", 0, 0, "eraAbbr");
addFormatToken("NNN", 0, 0, "eraAbbr");
addFormatToken("NNNN", 0, 0, "eraName");
addFormatToken("NNNNN", 0, 0, "eraNarrow");
addFormatToken("y", ["y", 1], "yo", "eraYear");
addFormatToken("y", ["yy", 2], 0, "eraYear");
addFormatToken("y", ["yyy", 3], 0, "eraYear");
addFormatToken("y", ["yyyy", 4], 0, "eraYear");
addRegexToken("N", matchEraAbbr);
addRegexToken("NN", matchEraAbbr);
addRegexToken("NNN", matchEraAbbr);
addRegexToken("NNNN", matchEraName);
addRegexToken("NNNNN", matchEraNarrow);
addParseToken(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(input, array, config, token2) {
    var era = config._locale.erasParse(input, token2, config._strict);
    if (era) {
      getParsingFlags(config).era = era;
    } else {
      getParsingFlags(config).invalidEra = input;
    }
  }
);
addRegexToken("y", matchUnsigned);
addRegexToken("yy", matchUnsigned);
addRegexToken("yyy", matchUnsigned);
addRegexToken("yyyy", matchUnsigned);
addRegexToken("yo", matchEraYearOrdinal);
addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
addParseToken(["yo"], function(input, array, config, token2) {
  var match;
  if (config._locale._eraYearOrdinalRegex) {
    match = input.match(config._locale._eraYearOrdinalRegex);
  }
  if (config._locale.eraYearOrdinalParse) {
    array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
  } else {
    array[YEAR] = parseInt(input, 10);
  }
});
function localeEras(m, format2) {
  var i, l, date, eras = this._eras || getLocale("en")._eras;
  for (i = 0, l = eras.length; i < l; ++i) {
    switch (typeof eras[i].since) {
      case "string":
        date = hooks(eras[i].since).startOf("day");
        eras[i].since = date.valueOf();
        break;
    }
    switch (typeof eras[i].until) {
      case "undefined":
        eras[i].until = Infinity;
        break;
      case "string":
        date = hooks(eras[i].until).startOf("day").valueOf();
        eras[i].until = date.valueOf();
        break;
    }
  }
  return eras;
}
function localeErasParse(eraName, format2, strict) {
  var i, l, eras = this.eras(), name, abbr, narrow;
  eraName = eraName.toUpperCase();
  for (i = 0, l = eras.length; i < l; ++i) {
    name = eras[i].name.toUpperCase();
    abbr = eras[i].abbr.toUpperCase();
    narrow = eras[i].narrow.toUpperCase();
    if (strict) {
      switch (format2) {
        case "N":
        case "NN":
        case "NNN":
          if (abbr === eraName) {
            return eras[i];
          }
          break;
        case "NNNN":
          if (name === eraName) {
            return eras[i];
          }
          break;
        case "NNNNN":
          if (narrow === eraName) {
            return eras[i];
          }
          break;
      }
    } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
      return eras[i];
    }
  }
}
function localeErasConvertYear(era, year) {
  var dir = era.since <= era.until ? 1 : -1;
  if (year === void 0) {
    return hooks(era.since).year();
  } else {
    return hooks(era.since).year() + (year - era.offset) * dir;
  }
}
function getEraName() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].name;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].name;
    }
  }
  return "";
}
function getEraNarrow() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].narrow;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].narrow;
    }
  }
  return "";
}
function getEraAbbr() {
  var i, l, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until) {
      return eras[i].abbr;
    }
    if (eras[i].until <= val && val <= eras[i].since) {
      return eras[i].abbr;
    }
  }
  return "";
}
function getEraYear() {
  var i, l, dir, val, eras = this.localeData().eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    dir = eras[i].since <= eras[i].until ? 1 : -1;
    val = this.clone().startOf("day").valueOf();
    if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
      return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
    }
  }
  return this.year();
}
function erasNameRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNameRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNameRegex : this._erasRegex;
}
function erasAbbrRegex(isStrict) {
  if (!hasOwnProp(this, "_erasAbbrRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasAbbrRegex : this._erasRegex;
}
function erasNarrowRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNarrowRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNarrowRegex : this._erasRegex;
}
function matchEraAbbr(isStrict, locale2) {
  return locale2.erasAbbrRegex(isStrict);
}
function matchEraName(isStrict, locale2) {
  return locale2.erasNameRegex(isStrict);
}
function matchEraNarrow(isStrict, locale2) {
  return locale2.erasNarrowRegex(isStrict);
}
function matchEraYearOrdinal(isStrict, locale2) {
  return locale2._eraYearOrdinalRegex || matchUnsigned;
}
function computeErasParse() {
  var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, erasName, erasAbbr, erasNarrow, eras = this.eras();
  for (i = 0, l = eras.length; i < l; ++i) {
    erasName = regexEscape(eras[i].name);
    erasAbbr = regexEscape(eras[i].abbr);
    erasNarrow = regexEscape(eras[i].narrow);
    namePieces.push(erasName);
    abbrPieces.push(erasAbbr);
    narrowPieces.push(erasNarrow);
    mixedPieces.push(erasName);
    mixedPieces.push(erasAbbr);
    mixedPieces.push(erasNarrow);
  }
  this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
  this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
  this._erasNarrowRegex = new RegExp(
    "^(" + narrowPieces.join("|") + ")",
    "i"
  );
}
addFormatToken(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
addFormatToken(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken(token2, getter) {
  addFormatToken(0, [token2, token2.length], 0, getter);
}
addWeekYearFormatToken("gggg", "weekYear");
addWeekYearFormatToken("ggggg", "weekYear");
addWeekYearFormatToken("GGGG", "isoWeekYear");
addWeekYearFormatToken("GGGGG", "isoWeekYear");
addRegexToken("G", matchSigned);
addRegexToken("g", matchSigned);
addRegexToken("GG", match1to2, match2);
addRegexToken("gg", match1to2, match2);
addRegexToken("GGGG", match1to4, match4);
addRegexToken("gggg", match1to4, match4);
addRegexToken("GGGGG", match1to6, match6);
addRegexToken("ggggg", match1to6, match6);
addWeekParseToken(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(input, week, config, token2) {
    week[token2.substr(0, 2)] = toInt(input);
  }
);
addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
  week[token2] = hooks.parseTwoDigitYear(input);
});
function getSetWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.week(),
    this.weekday() + this.localeData()._week.dow,
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function getSetISOWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function getISOWeeksInYear() {
  return weeksInYear(this.year(), 1, 4);
}
function getISOWeeksInISOWeekYear() {
  return weeksInYear(this.isoWeekYear(), 1, 4);
}
function getWeeksInYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}
function getWeeksInWeekYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
}
function getSetWeekYearHelper(input, week, weekday, dow, doy) {
  var weeksTarget;
  if (input == null) {
    return weekOfYear(this, dow, doy).year;
  } else {
    weeksTarget = weeksInYear(input, dow, doy);
    if (week > weeksTarget) {
      week = weeksTarget;
    }
    return setWeekAll.call(this, input, week, weekday, dow, doy);
  }
}
function setWeekAll(weekYear, week, weekday, dow, doy) {
  var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  this.year(date.getUTCFullYear());
  this.month(date.getUTCMonth());
  this.date(date.getUTCDate());
  return this;
}
addFormatToken("Q", 0, "Qo", "quarter");
addRegexToken("Q", match1);
addParseToken("Q", function(input, array) {
  array[MONTH] = (toInt(input) - 1) * 3;
});
function getSetQuarter(input) {
  return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
addFormatToken("D", ["DD", 2], "Do", "date");
addRegexToken("D", match1to2, match1to2NoLeadingZero);
addRegexToken("DD", match1to2, match2);
addRegexToken("Do", function(isStrict, locale2) {
  return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
});
addParseToken(["D", "DD"], DATE);
addParseToken("Do", function(input, array) {
  array[DATE] = toInt(input.match(match1to2)[0]);
});
var getSetDayOfMonth = makeGetSet("Date", true);
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
addRegexToken("DDD", match1to3);
addRegexToken("DDDD", match3);
addParseToken(["DDD", "DDDD"], function(input, array, config) {
  config._dayOfYear = toInt(input);
});
function getSetDayOfYear(input) {
  var dayOfYear = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
}
addFormatToken("m", ["mm", 2], 0, "minute");
addRegexToken("m", match1to2, match1to2HasZero);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", false);
addFormatToken("s", ["ss", 2], 0, "second");
addRegexToken("s", match1to2, match1to2HasZero);
addRegexToken("ss", match1to2, match2);
addParseToken(["s", "ss"], SECOND);
var getSetSecond = makeGetSet("Seconds", false);
addFormatToken("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
addFormatToken(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
addFormatToken(0, ["SSS", 3], 0, "millisecond");
addFormatToken(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
addFormatToken(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
addFormatToken(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
addFormatToken(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
addRegexToken("S", match1to3, match1);
addRegexToken("SS", match1to3, match2);
addRegexToken("SSS", match1to3, match3);
var token, getSetMillisecond;
for (token = "SSSS"; token.length <= 9; token += "S") {
  addRegexToken(token, matchUnsigned);
}
function parseMs(input, array) {
  array[MILLISECOND] = toInt(("0." + input) * 1e3);
}
for (token = "S"; token.length <= 9; token += "S") {
  addParseToken(token, parseMs);
}
getSetMillisecond = makeGetSet("Milliseconds", false);
addFormatToken("z", 0, 0, "zoneAbbr");
addFormatToken("zz", 0, 0, "zoneName");
function getZoneAbbr() {
  return this._isUTC ? "UTC" : "";
}
function getZoneName() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var proto = Moment.prototype;
proto.add = add;
proto.calendar = calendar$1;
proto.clone = clone;
proto.diff = diff;
proto.endOf = endOf;
proto.format = format;
proto.from = from;
proto.fromNow = fromNow;
proto.to = to;
proto.toNow = toNow;
proto.get = stringGet;
proto.invalidAt = invalidAt;
proto.isAfter = isAfter;
proto.isBefore = isBefore;
proto.isBetween = isBetween;
proto.isSame = isSame;
proto.isSameOrAfter = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid = isValid$2;
proto.lang = lang;
proto.locale = locale;
proto.localeData = localeData;
proto.max = prototypeMax;
proto.min = prototypeMin;
proto.parsingFlags = parsingFlags;
proto.set = stringSet;
proto.startOf = startOf;
proto.subtract = subtract;
proto.toArray = toArray;
proto.toObject = toObject;
proto.toDate = toDate;
proto.toISOString = toISOString;
proto.inspect = inspect;
if (typeof Symbol !== "undefined" && Symbol.for != null) {
  proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
    return "Moment<" + this.format() + ">";
  };
}
proto.toJSON = toJSON;
proto.toString = toString;
proto.unix = unix;
proto.valueOf = valueOf;
proto.creationData = creationData;
proto.eraName = getEraName;
proto.eraNarrow = getEraNarrow;
proto.eraAbbr = getEraAbbr;
proto.eraYear = getEraYear;
proto.year = getSetYear;
proto.isLeapYear = getIsLeapYear;
proto.weekYear = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;
proto.quarter = proto.quarters = getSetQuarter;
proto.month = getSetMonth;
proto.daysInMonth = getDaysInMonth;
proto.week = proto.weeks = getSetWeek;
proto.isoWeek = proto.isoWeeks = getSetISOWeek;
proto.weeksInYear = getWeeksInYear;
proto.weeksInWeekYear = getWeeksInWeekYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
proto.date = getSetDayOfMonth;
proto.day = proto.days = getSetDayOfWeek;
proto.weekday = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear = getSetDayOfYear;
proto.hour = proto.hours = getSetHour;
proto.minute = proto.minutes = getSetMinute;
proto.second = proto.seconds = getSetSecond;
proto.millisecond = proto.milliseconds = getSetMillisecond;
proto.utcOffset = getSetOffset;
proto.utc = setOffsetToUTC;
proto.local = setOffsetToLocal;
proto.parseZone = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST = isDaylightSavingTime;
proto.isLocal = isLocal;
proto.isUtcOffset = isUtcOffset;
proto.isUtc = isUtc;
proto.isUTC = isUtc;
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;
proto.dates = deprecate(
  "dates accessor is deprecated. Use date instead.",
  getSetDayOfMonth
);
proto.months = deprecate(
  "months accessor is deprecated. Use month instead",
  getSetMonth
);
proto.years = deprecate(
  "years accessor is deprecated. Use year instead",
  getSetYear
);
proto.zone = deprecate(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  getSetZone
);
proto.isDSTShifted = deprecate(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  isDaylightSavingTimeShifted
);
function createUnix(input) {
  return createLocal(input * 1e3);
}
function createInZone() {
  return createLocal.apply(null, arguments).parseZone();
}
function preParsePostFormat(string) {
  return string;
}
var proto$1 = Locale.prototype;
proto$1.calendar = calendar;
proto$1.longDateFormat = longDateFormat;
proto$1.invalidDate = invalidDate;
proto$1.ordinal = ordinal;
proto$1.preparse = preParsePostFormat;
proto$1.postformat = preParsePostFormat;
proto$1.relativeTime = relativeTime;
proto$1.pastFuture = pastFuture;
proto$1.set = set;
proto$1.eras = localeEras;
proto$1.erasParse = localeErasParse;
proto$1.erasConvertYear = localeErasConvertYear;
proto$1.erasAbbrRegex = erasAbbrRegex;
proto$1.erasNameRegex = erasNameRegex;
proto$1.erasNarrowRegex = erasNarrowRegex;
proto$1.months = localeMonths;
proto$1.monthsShort = localeMonthsShort;
proto$1.monthsParse = localeMonthsParse;
proto$1.monthsRegex = monthsRegex;
proto$1.monthsShortRegex = monthsShortRegex;
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;
proto$1.weekdays = localeWeekdays;
proto$1.weekdaysMin = localeWeekdaysMin;
proto$1.weekdaysShort = localeWeekdaysShort;
proto$1.weekdaysParse = localeWeekdaysParse;
proto$1.weekdaysRegex = weekdaysRegex;
proto$1.weekdaysShortRegex = weekdaysShortRegex;
proto$1.weekdaysMinRegex = weekdaysMinRegex;
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;
function get$1(format2, index, field, setter) {
  var locale2 = getLocale(), utc = createUTC().set(setter, index);
  return locale2[field](utc, format2);
}
function listMonthsImpl(format2, index, field) {
  if (isNumber(format2)) {
    index = format2;
    format2 = void 0;
  }
  format2 = format2 || "";
  if (index != null) {
    return get$1(format2, index, field, "month");
  }
  var i, out = [];
  for (i = 0; i < 12; i++) {
    out[i] = get$1(format2, i, field, "month");
  }
  return out;
}
function listWeekdaysImpl(localeSorted, format2, index, field) {
  if (typeof localeSorted === "boolean") {
    if (isNumber(format2)) {
      index = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  } else {
    format2 = localeSorted;
    index = format2;
    localeSorted = false;
    if (isNumber(format2)) {
      index = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  }
  var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
  if (index != null) {
    return get$1(format2, (index + shift) % 7, field, "day");
  }
  for (i = 0; i < 7; i++) {
    out[i] = get$1(format2, (i + shift) % 7, field, "day");
  }
  return out;
}
function listMonths(format2, index) {
  return listMonthsImpl(format2, index, "months");
}
function listMonthsShort(format2, index) {
  return listMonthsImpl(format2, index, "monthsShort");
}
function listWeekdays(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
}
function listWeekdaysShort(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
}
function listWeekdaysMin(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
}
getSetGlobalLocale("en", {
  eras: [
    {
      since: "0001-01-01",
      until: Infinity,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -Infinity,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(number) {
    var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number + output;
  }
});
hooks.lang = deprecate(
  "moment.lang is deprecated. Use moment.locale instead.",
  getSetGlobalLocale
);
hooks.langData = deprecate(
  "moment.langData is deprecated. Use moment.localeData instead.",
  getLocale
);
var mathAbs = Math.abs;
function abs() {
  var data = this._data;
  this._milliseconds = mathAbs(this._milliseconds);
  this._days = mathAbs(this._days);
  this._months = mathAbs(this._months);
  data.milliseconds = mathAbs(data.milliseconds);
  data.seconds = mathAbs(data.seconds);
  data.minutes = mathAbs(data.minutes);
  data.hours = mathAbs(data.hours);
  data.months = mathAbs(data.months);
  data.years = mathAbs(data.years);
  return this;
}
function addSubtract$1(duration, input, value, direction) {
  var other = createDuration(input, value);
  duration._milliseconds += direction * other._milliseconds;
  duration._days += direction * other._days;
  duration._months += direction * other._months;
  return duration._bubble();
}
function add$1(input, value) {
  return addSubtract$1(this, input, value, 1);
}
function subtract$1(input, value) {
  return addSubtract$1(this, input, value, -1);
}
function absCeil(number) {
  if (number < 0) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
}
function bubble() {
  var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
  if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
    milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
    days2 = 0;
    months2 = 0;
  }
  data.milliseconds = milliseconds2 % 1e3;
  seconds2 = absFloor(milliseconds2 / 1e3);
  data.seconds = seconds2 % 60;
  minutes2 = absFloor(seconds2 / 60);
  data.minutes = minutes2 % 60;
  hours2 = absFloor(minutes2 / 60);
  data.hours = hours2 % 24;
  days2 += absFloor(hours2 / 24);
  monthsFromDays = absFloor(daysToMonths(days2));
  months2 += monthsFromDays;
  days2 -= absCeil(monthsToDays(monthsFromDays));
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  data.days = days2;
  data.months = months2;
  data.years = years2;
  return this;
}
function daysToMonths(days2) {
  return days2 * 4800 / 146097;
}
function monthsToDays(months2) {
  return months2 * 146097 / 4800;
}
function as(units) {
  if (!this.isValid()) {
    return NaN;
  }
  var days2, months2, milliseconds2 = this._milliseconds;
  units = normalizeUnits(units);
  if (units === "month" || units === "quarter" || units === "year") {
    days2 = this._days + milliseconds2 / 864e5;
    months2 = this._months + daysToMonths(days2);
    switch (units) {
      case "month":
        return months2;
      case "quarter":
        return months2 / 3;
      case "year":
        return months2 / 12;
    }
  } else {
    days2 = this._days + Math.round(monthsToDays(this._months));
    switch (units) {
      case "week":
        return days2 / 7 + milliseconds2 / 6048e5;
      case "day":
        return days2 + milliseconds2 / 864e5;
      case "hour":
        return days2 * 24 + milliseconds2 / 36e5;
      case "minute":
        return days2 * 1440 + milliseconds2 / 6e4;
      case "second":
        return days2 * 86400 + milliseconds2 / 1e3;
      case "millisecond":
        return Math.floor(days2 * 864e5) + milliseconds2;
      default:
        throw new Error("Unknown unit " + units);
    }
  }
}
function makeAs(alias) {
  return function() {
    return this.as(alias);
  };
}
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y"), valueOf$1 = asMilliseconds;
function clone$1() {
  return createDuration(this);
}
function get$2(units) {
  units = normalizeUnits(units);
  return this.isValid() ? this[units + "s"]() : NaN;
}
function makeGetter(name) {
  return function() {
    return this.isValid() ? this._data[name] : NaN;
  };
}
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() {
  return absFloor(this.days() / 7);
}
var round = Math.round, thresholds = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
  return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
  var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
  if (thresholds2.w != null) {
    a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
  }
  a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
  a[2] = withoutSuffix;
  a[3] = +posNegDuration > 0;
  a[4] = locale2;
  return substituteTimeAgo.apply(null, a);
}
function getSetRelativeTimeRounding(roundingFunction) {
  if (roundingFunction === void 0) {
    return round;
  }
  if (typeof roundingFunction === "function") {
    round = roundingFunction;
    return true;
  }
  return false;
}
function getSetRelativeTimeThreshold(threshold, limit) {
  if (thresholds[threshold] === void 0) {
    return false;
  }
  if (limit === void 0) {
    return thresholds[threshold];
  }
  thresholds[threshold] = limit;
  if (threshold === "s") {
    thresholds.ss = limit - 1;
  }
  return true;
}
function humanize(argWithSuffix, argThresholds) {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var withSuffix = false, th = thresholds, locale2, output;
  if (typeof argWithSuffix === "object") {
    argThresholds = argWithSuffix;
    argWithSuffix = false;
  }
  if (typeof argWithSuffix === "boolean") {
    withSuffix = argWithSuffix;
  }
  if (typeof argThresholds === "object") {
    th = Object.assign({}, thresholds, argThresholds);
    if (argThresholds.s != null && argThresholds.ss == null) {
      th.ss = argThresholds.s - 1;
    }
  }
  locale2 = this.localeData();
  output = relativeTime$1(this, !withSuffix, th, locale2);
  if (withSuffix) {
    output = locale2.pastFuture(+this, output);
  }
  return locale2.postformat(output);
}
var abs$1 = Math.abs;
function sign(x) {
  return (x > 0) - (x < 0) || +x;
}
function toISOString$1() {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
  if (!total) {
    return "P0D";
  }
  minutes2 = absFloor(seconds2 / 60);
  hours2 = absFloor(minutes2 / 60);
  seconds2 %= 60;
  minutes2 %= 60;
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
  totalSign = total < 0 ? "-" : "";
  ymSign = sign(this._months) !== sign(total) ? "-" : "";
  daysSign = sign(this._days) !== sign(total) ? "-" : "";
  hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
  return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
}
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1;
proto$2.abs = abs;
proto$2.add = add$1;
proto$2.subtract = subtract$1;
proto$2.as = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds = asSeconds;
proto$2.asMinutes = asMinutes;
proto$2.asHours = asHours;
proto$2.asDays = asDays;
proto$2.asWeeks = asWeeks;
proto$2.asMonths = asMonths;
proto$2.asQuarters = asQuarters;
proto$2.asYears = asYears;
proto$2.valueOf = valueOf$1;
proto$2._bubble = bubble;
proto$2.clone = clone$1;
proto$2.get = get$2;
proto$2.milliseconds = milliseconds;
proto$2.seconds = seconds;
proto$2.minutes = minutes;
proto$2.hours = hours;
proto$2.days = days;
proto$2.weeks = weeks;
proto$2.months = months;
proto$2.years = years;
proto$2.humanize = humanize;
proto$2.toISOString = toISOString$1;
proto$2.toString = toISOString$1;
proto$2.toJSON = toISOString$1;
proto$2.locale = locale;
proto$2.localeData = localeData;
proto$2.toIsoString = deprecate(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  toISOString$1
);
proto$2.lang = lang;
addFormatToken("X", 0, 0, "unix");
addFormatToken("x", 0, 0, "valueOf");
addRegexToken("x", matchSigned);
addRegexToken("X", matchTimestamp);
addParseToken("X", function(input, array, config) {
  config._d = new Date(parseFloat(input) * 1e3);
});
addParseToken("x", function(input, array, config) {
  config._d = new Date(toInt(input));
});
//! moment.js
hooks.version = "2.30.1";
setHookCallback(createLocal);
hooks.fn = proto;
hooks.min = min;
hooks.max = max;
hooks.now = now;
hooks.utc = createUTC;
hooks.unix = createUnix;
hooks.months = listMonths;
hooks.isDate = isDate;
hooks.locale = getSetGlobalLocale;
hooks.invalid = createInvalid;
hooks.duration = createDuration;
hooks.isMoment = isMoment;
hooks.weekdays = listWeekdays;
hooks.parseZone = createInZone;
hooks.localeData = getLocale;
hooks.isDuration = isDuration;
hooks.monthsShort = listMonthsShort;
hooks.weekdaysMin = listWeekdaysMin;
hooks.defineLocale = defineLocale;
hooks.updateLocale = updateLocale;
hooks.locales = listLocales;
hooks.weekdaysShort = listWeekdaysShort;
hooks.normalizeUnits = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat = getCalendarFormat;
hooks.prototype = proto;
hooks.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
defineStore("loadingStore", () => {
  const isLoading = ref(false);
  function changLoading(status) {
    isLoading.value = status;
  }
  return {
    isLoading,
    changLoading
  };
});
const RESUME_JSON = {
  ID: "",
  // 模板Id
  NAME: "",
  TITLE: "模板标题",
  LAYOUT: "classical",
  // 布局模式
  COMPONENTS: [],
  // 模板内组件列表
  GLOBAL_STYLE: {
    themeColor: "#079cfa",
    // 主题色
    firstTitleFontSize: "20px",
    // 一级标题
    secondTitleFontSize: "14px",
    // 二级标题
    textFontSize: "14px",
    // 正文
    secondTitleColor: "#666",
    // 二级标题字体颜色
    textFontColor: "#757575",
    // 正文字体颜色
    secondTitleWeight: 600,
    // 二级标题字体粗细
    textFontWeight: 500,
    // 正文字体粗细
    pTopBottom: "0",
    // 上下内边距
    pLeftRight: "",
    // 左右内边距
    modelMarginTop: "0px",
    modelMarginBottom: "45px",
    leftWidth: "",
    // 左右布局时左侧宽度
    rightWidth: "",
    // 左右布局时右侧宽度
    leftThemeColor: "",
    // 左侧布局时左侧背景色
    rightThemeColor: "",
    // 右侧布局时右侧背景色
    resumeBackgroundCom: ""
  }
};
defineStore("resumeJsonNew", () => {
  const resume_json = cloneDeep(RESUME_JSON);
  const importJson = ref(resume_json);
  const resumeJsonNewStore = ref(resume_json);
  function changeResumeJsonData(obj) {
    resumeJsonNewStore.value = cloneDeep(obj);
  }
  function changeImportJsonData(obj) {
    importJson.value = cloneDeep(obj);
  }
  function pushComponent(data) {
    resumeJsonNewStore.value.COMPONENTS.push(data);
  }
  function resetResumeJson() {
    resumeJsonNewStore.value = cloneDeep(RESUME_JSON);
  }
  return {
    resumeJsonNewStore,
    importJson,
    changeResumeJsonData,
    changeImportJsonData,
    pushComponent,
    resetResumeJson
  };
});
defineStore("selectMaterialStore", () => {
  const cptName = ref("");
  const cptOptionsName = ref("");
  const cptTitle = ref("全局主题设置");
  const cptKeyId = ref("");
  function updateSelectModel(cptNameTxt, cptOptionsNameTxt, cptTitleTxt, cptKeyIdTxt) {
    cptName.value = cptNameTxt;
    cptOptionsName.value = cptOptionsNameTxt;
    cptTitle.value = cptTitleTxt;
    cptKeyId.value = cptKeyIdTxt;
  }
  function resetSelectModel() {
    cptName.value = "";
    cptOptionsName.value = "";
    cptTitle.value = "全局主题设置";
    cptKeyId.value = "";
  }
  return {
    cptName,
    cptOptionsName,
    cptTitle,
    cptKeyId,
    updateSelectModel,
    resetSelectModel
  };
});
defineStore("uuidStore", () => {
  const refreshUuid = ref(getUuid());
  function setUuid() {
    refreshUuid.value = getUuid();
  }
  return {
    refreshUuid,
    setUuid
  };
});
defineStore("tokenStore", () => {
  const token2 = ref(localStorage.getItem("token"));
  function saveToken(tokenStr) {
    token2.value = tokenStr;
    localStorage.setItem("token", token2.value);
  }
  return {
    token: token2,
    saveToken
  };
});
defineStore("refreshStore", () => {
  const refreshUuid = ref(getUuid());
  function setUuid() {
    refreshUuid.value = getUuid();
  }
  return {
    refreshUuid,
    setUuid
  };
});
const appStore = {};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var conversion = { exports: {} };
(function(module2, exports) {
  !function(t, e) {
    module2.exports = e();
  }(commonjsGlobal, function() {
    return function(t) {
      var e = {};
      function n(r) {
        if (e[r])
          return e[r].exports;
        var o = e[r] = { i: r, l: false, exports: {} };
        return t[r].call(o.exports, o, o.exports, n), o.l = true, o.exports;
      }
      return n.m = t, n.c = e, n.d = function(t2, e2, r) {
        n.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: r });
      }, n.r = function(t2) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      }, n.t = function(t2, e2) {
        if (1 & e2 && (t2 = n(t2)), 8 & e2)
          return t2;
        if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule)
          return t2;
        var r = /* @__PURE__ */ Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2)
          for (var o in t2)
            n.d(r, o, (function(e3) {
              return t2[e3];
            }).bind(null, o));
        return r;
      }, n.n = function(t2) {
        var e2 = t2 && t2.__esModule ? function() {
          return t2.default;
        } : function() {
          return t2;
        };
        return n.d(e2, "a", e2), e2;
      }, n.o = function(t2, e2) {
        return Object.prototype.hasOwnProperty.call(t2, e2);
      }, n.p = "", n(n.s = 0);
    }([function(t, e, n) {
      var r;
      function o(t2) {
        return ["image/png", "image/jpeg", "image/gif"].some((e2) => e2 === t2);
      }
      n.r(e), n.d(e, "canvastoDataURL", function() {
        return a;
      }), n.d(e, "canvastoFile", function() {
        return c;
      }), n.d(e, "dataURLtoFile", function() {
        return s;
      }), n.d(e, "dataURLtoImage", function() {
        return l;
      }), n.d(e, "downloadFile", function() {
        return d;
      }), n.d(e, "filetoDataURL", function() {
        return f2;
      }), n.d(e, "imagetoCanvas", function() {
        return g;
      }), n.d(e, "urltoBlob", function() {
        return w;
      }), n.d(e, "urltoImage", function() {
        return m;
      }), n.d(e, "compress", function() {
        return p;
      }), n.d(e, "compressAccurately", function() {
        return b;
      }), n.d(e, "EImageType", function() {
        return r;
      }), function(t2) {
        t2.PNG = "image/png", t2.JPEG = "image/jpeg", t2.GIF = "image/gif";
      }(r || (r = {}));
      var i = function(t2, e2, n2, r2) {
        return new (n2 || (n2 = Promise))(function(o2, i2) {
          function a2(t3) {
            try {
              u2(r2.next(t3));
            } catch (t4) {
              i2(t4);
            }
          }
          function c2(t3) {
            try {
              u2(r2.throw(t3));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(t3) {
            var e3;
            t3.done ? o2(t3.value) : (e3 = t3.value, e3 instanceof n2 ? e3 : new n2(function(t4) {
              t4(e3);
            })).then(a2, c2);
          }
          u2((r2 = r2.apply(t2, [])).next());
        });
      };
      function a(t2, e2 = 0.92, n2 = r.JPEG) {
        return i(this, void 0, void 0, function* () {
          return o(n2) || (n2 = r.JPEG), t2.toDataURL(n2, e2);
        });
      }
      function c(t2, e2 = 0.92, n2 = r.JPEG) {
        return new Promise((r2) => t2.toBlob((t3) => r2(t3), n2, e2));
      }
      var u = function(t2, e2, n2, r2) {
        return new (n2 || (n2 = Promise))(function(o2, i2) {
          function a2(t3) {
            try {
              u2(r2.next(t3));
            } catch (t4) {
              i2(t4);
            }
          }
          function c2(t3) {
            try {
              u2(r2.throw(t3));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(t3) {
            var e3;
            t3.done ? o2(t3.value) : (e3 = t3.value, e3 instanceof n2 ? e3 : new n2(function(t4) {
              t4(e3);
            })).then(a2, c2);
          }
          u2((r2 = r2.apply(t2, [])).next());
        });
      };
      function s(t2, e2) {
        return u(this, void 0, void 0, function* () {
          const n2 = t2.split(",");
          let r2 = n2[0].match(/:(.*?);/)[1];
          const i2 = atob(n2[1]);
          let a2 = i2.length;
          const c2 = new Uint8Array(a2);
          for (; a2--; )
            c2[a2] = i2.charCodeAt(a2);
          return o(e2) && (r2 = e2), new Blob([c2], { type: r2 });
        });
      }
      function l(t2) {
        return new Promise((e2, n2) => {
          const r2 = new Image();
          r2.onload = () => e2(r2), r2.onerror = () => n2(new Error("dataURLtoImage(): dataURL is illegal")), r2.src = t2;
        });
      }
      function d(t2, e2) {
        const n2 = document.createElement("a");
        n2.href = window.URL.createObjectURL(t2), n2.download = e2 || Date.now().toString(36), document.body.appendChild(n2);
        const r2 = document.createEvent("MouseEvents");
        r2.initEvent("click", false, false), n2.dispatchEvent(r2), document.body.removeChild(n2);
      }
      function f2(t2) {
        return new Promise((e2) => {
          const n2 = new FileReader();
          n2.onloadend = (t3) => e2(t3.target.result), n2.readAsDataURL(t2);
        });
      }
      var h = function(t2, e2, n2, r2) {
        return new (n2 || (n2 = Promise))(function(o2, i2) {
          function a2(t3) {
            try {
              u2(r2.next(t3));
            } catch (t4) {
              i2(t4);
            }
          }
          function c2(t3) {
            try {
              u2(r2.throw(t3));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(t3) {
            var e3;
            t3.done ? o2(t3.value) : (e3 = t3.value, e3 instanceof n2 ? e3 : new n2(function(t4) {
              t4(e3);
            })).then(a2, c2);
          }
          u2((r2 = r2.apply(t2, [])).next());
        });
      };
      function g(t2, e2 = {}) {
        return h(this, void 0, void 0, function* () {
          const n2 = Object.assign({}, e2), r2 = document.createElement("canvas"), o2 = r2.getContext("2d");
          let i2, a2;
          for (const t3 in n2)
            Object.prototype.hasOwnProperty.call(n2, t3) && (n2[t3] = Number(n2[t3]));
          if (n2.scale) {
            const e3 = n2.scale > 0 && n2.scale < 10 ? n2.scale : 1;
            a2 = t2.width * e3, i2 = t2.height * e3;
          } else
            a2 = n2.width || n2.height * t2.width / t2.height || t2.width, i2 = n2.height || n2.width * t2.height / t2.width || t2.height;
          switch ([5, 6, 7, 8].some((t3) => t3 === n2.orientation) ? (r2.height = a2, r2.width = i2) : (r2.height = i2, r2.width = a2), n2.orientation) {
            case 3:
              o2.rotate(180 * Math.PI / 180), o2.drawImage(t2, -r2.width, -r2.height, r2.width, r2.height);
              break;
            case 6:
              o2.rotate(90 * Math.PI / 180), o2.drawImage(t2, 0, -r2.width, r2.height, r2.width);
              break;
            case 8:
              o2.rotate(270 * Math.PI / 180), o2.drawImage(t2, -r2.height, 0, r2.height, r2.width);
              break;
            case 2:
              o2.translate(r2.width, 0), o2.scale(-1, 1), o2.drawImage(t2, 0, 0, r2.width, r2.height);
              break;
            case 4:
              o2.translate(r2.width, 0), o2.scale(-1, 1), o2.rotate(180 * Math.PI / 180), o2.drawImage(t2, -r2.width, -r2.height, r2.width, r2.height);
              break;
            case 5:
              o2.translate(r2.width, 0), o2.scale(-1, 1), o2.rotate(90 * Math.PI / 180), o2.drawImage(t2, 0, -r2.width, r2.height, r2.width);
              break;
            case 7:
              o2.translate(r2.width, 0), o2.scale(-1, 1), o2.rotate(270 * Math.PI / 180), o2.drawImage(t2, -r2.height, 0, r2.height, r2.width);
              break;
            default:
              o2.drawImage(t2, 0, 0, r2.width, r2.height);
          }
          return r2;
        });
      }
      function w(t2) {
        return fetch(t2).then((t3) => t3.blob());
      }
      function m(t2) {
        return new Promise((e2, n2) => {
          const r2 = new Image();
          r2.onload = () => e2(r2), r2.onerror = () => n2(new Error("urltoImage(): Image failed to load, please check the image URL")), r2.src = t2;
        });
      }
      var y = function(t2, e2, n2, r2) {
        return new (n2 || (n2 = Promise))(function(o2, i2) {
          function a2(t3) {
            try {
              u2(r2.next(t3));
            } catch (t4) {
              i2(t4);
            }
          }
          function c2(t3) {
            try {
              u2(r2.throw(t3));
            } catch (t4) {
              i2(t4);
            }
          }
          function u2(t3) {
            var e3;
            t3.done ? o2(t3.value) : (e3 = t3.value, e3 instanceof n2 ? e3 : new n2(function(t4) {
              t4(e3);
            })).then(a2, c2);
          }
          u2((r2 = r2.apply(t2, [])).next());
        });
      };
      function p(t2, e2 = {}) {
        return y(this, void 0, void 0, function* () {
          if (!(t2 instanceof Blob))
            throw new Error("compress(): First arg must be a Blob object or a File object.");
          if ("object" != typeof e2 && (e2 = Object.assign({ quality: e2 })), e2.quality = Number(e2.quality), Number.isNaN(e2.quality))
            return t2;
          const n2 = yield f2(t2);
          let i2 = n2.split(",")[0].match(/:(.*?);/)[1], c2 = r.JPEG;
          o(e2.type) && (c2 = e2.type, i2 = e2.type);
          const u2 = yield l(n2), d2 = yield g(u2, Object.assign({}, e2)), h2 = yield a(d2, e2.quality, c2), w2 = yield s(h2, i2);
          return w2.size > t2.size ? t2 : w2;
        });
      }
      function b(t2, e2 = {}) {
        return y(this, void 0, void 0, function* () {
          if (!(t2 instanceof Blob))
            throw new Error("compressAccurately(): First arg must be a Blob object or a File object.");
          if ("object" != typeof e2 && (e2 = Object.assign({ size: e2 })), e2.size = Number(e2.size), Number.isNaN(e2.size))
            return t2;
          if (1024 * e2.size > t2.size)
            return t2;
          e2.accuracy = Number(e2.accuracy), (!e2.accuracy || e2.accuracy < 0.8 || e2.accuracy > 0.99) && (e2.accuracy = 0.95);
          const n2 = e2.size * (2 - e2.accuracy) * 1024, i2 = 1024 * e2.size, c2 = e2.size * e2.accuracy * 1024, u2 = yield f2(t2);
          let d2 = u2.split(",")[0].match(/:(.*?);/)[1], h2 = r.JPEG;
          o(e2.type) && (h2 = e2.type, d2 = e2.type);
          const w2 = yield l(u2), m2 = yield g(w2, Object.assign({}, e2));
          let y2, p2 = 0.5;
          const b2 = [null, null];
          for (let t3 = 1; t3 <= 7; t3++) {
            y2 = yield a(m2, p2, h2);
            const e3 = 0.75 * y2.length;
            if (7 === t3) {
              (n2 < e3 || c2 > e3) && (y2 = [y2, ...b2].filter((t4) => t4).sort((t4, e4) => Math.abs(0.75 * t4.length - i2) - Math.abs(0.75 * e4.length - i2))[0]);
              break;
            }
            if (n2 < e3)
              b2[1] = y2, p2 -= Math.pow(0.5, t3 + 1);
            else {
              if (!(c2 > e3))
                break;
              b2[0] = y2, p2 += Math.pow(0.5, t3 + 1);
            }
          }
          const v = yield s(y2, d2);
          return v.size > t2.size ? t2 : v;
        });
      }
    }]);
  });
})(conversion);
const pxTonumber = (value) => {
  if (value) {
    return Number(value.split("px")[0]);
  } else {
    return 0;
  }
};
const textToNumber = (value) => {
  let number = 0;
  switch (value) {
    case "了解":
      number = 25;
      break;
    case "一般":
      number = 50;
      break;
    case "熟悉":
      number = 75;
      break;
    case "精通":
      number = 100;
      break;
  }
  return number;
};
const numberToText = (value) => {
  if (value <= 25) {
    return "一般";
  } else if (value <= 50) {
    return "掌握";
  } else if (value <= 75) {
    return "熟练";
  } else {
    return "精通";
  }
};
const getUuid = () => {
  return uuid.v4().split("-").join("");
};
const formatDate = (dataArray) => {
  if (Array.isArray(dataArray)) {
    const startDate = hooks(new Date(dataArray[0])).format("YYYY.MM").split("-").join(".");
    let endDate;
    if (dataArray[1] === "至今") {
      endDate = "至今";
    } else {
      endDate = hooks(new Date(dataArray[1])).format("YYYY.MM").split("-").join(".");
    }
    return `${startDate}-${endDate}`;
  } else {
    return hooks(new Date(dataArray)).format("YYYY.MM").split("-").join(".");
  }
};
const _hoisted_1$2v = { class: "edu-background" };
const _hoisted_2$1A = { class: "edu-list" };
const _hoisted_3$1c = { key: 0 };
const _hoisted_4$I = { key: 1 };
const _hoisted_5$H = { key: 2 };
const _hoisted_6$D = { key: 3 };
const _sfc_main$2G = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3e9c9544": _ctx.modelStyle.pTop,
      "110a8bdc": _ctx.modelStyle.pBottom,
      "200bf9f8": _ctx.modelStyle.pLeftRight,
      "7257da19": _ctx.modelStyle.mBottom,
      "3e9b3827": _ctx.modelStyle.mTop,
      "1ed24bc9": _ctx.modelStyle.titleFontSize,
      "73e3c9ac": _ctx.modelStyle.titleColor,
      "8bfc4780": _ctx.modelStyle.titleFontWeight
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2v, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$1A, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("ul", {
              key: index,
              class: "list-item"
            }, [
              _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$1c, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
              _ctx.modelData.isShow.schoolName ? (openBlock(), createElementBlock("li", _hoisted_4$I, toDisplayString(item.schoolName), 1)) : createCommentVNode("", true),
              _ctx.modelData.isShow.specialized ? (openBlock(), createElementBlock("li", _hoisted_5$H, toDisplayString(item.specialized), 1)) : createCommentVNode("", true),
              _ctx.modelData.isShow.degree ? (openBlock(), createElementBlock("li", _hoisted_6$D, toDisplayString(item.degree), 1)) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReEduBackground1 = /* @__PURE__ */ _export_sfc(_sfc_main$2G, [["__scopeId", "data-v-f396705c"]]);
const _hoisted_1$2u = { class: "template2-model-title" };
const _hoisted_2$1z = { class: "icon-box" };
const _hoisted_3$1b = { class: "right-title" };
const _sfc_main$2F = /* @__PURE__ */ defineComponent({
  __name: "ModelTitle",
  props: {
    title: {},
    iconfont: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "4802f4b4": _ctx.modelStyle.themeColor,
      "1142c524": _ctx.modelStyle.firstTitleFontSize
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$2u, [
        createElementVNode("div", _hoisted_2$1z, [
          createVNode(_component_svg_icon, {
            "icon-name": _ctx.iconfont,
            color: "#fff",
            size: "15px"
          }, null, 8, ["icon-name"])
        ]),
        createElementVNode("div", _hoisted_3$1b, [
          createElementVNode("h1", null, toDisplayString(_ctx.title), 1)
        ])
      ]);
    };
  }
});
const ModelTitle$6 = /* @__PURE__ */ _export_sfc(_sfc_main$2F, [["__scopeId", "data-v-99cb7628"]]);
const _hoisted_1$2t = { class: "edu-background" };
const _hoisted_2$1y = { class: "edu-list" };
const _hoisted_3$1a = { class: "date-school-box" };
const _hoisted_4$H = { key: 0 };
const _hoisted_5$G = { key: 1 };
const _hoisted_6$C = { key: 2 };
const _hoisted_7$s = {
  key: 0,
  class: "special"
};
const _hoisted_8$n = {
  key: 1,
  class: "majorCourse"
};
const _sfc_main$2E = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "0187de8a": _ctx.modelStyle.pTop,
      "038e74d6": _ctx.modelStyle.pBottom,
      "9702806c": _ctx.modelStyle.pLeftRight,
      "64dbc313": _ctx.modelStyle.mBottom,
      "0186816d": _ctx.modelStyle.mTop,
      "319e1143": _ctx.modelStyle.titleFontSize,
      "eada5020": _ctx.modelStyle.titleColor,
      "48f22b3a": _ctx.modelStyle.titleFontWeight,
      "5a2037fc": _ctx.modelStyle.textFontSize,
      "8ff5d4de": _ctx.modelStyle.textColor,
      "45cb6b8e": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$2t, [
        createVNode(ModelTitle$6, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("div", _hoisted_2$1y, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list-item"
            }, [
              createElementVNode("div", _hoisted_3$1a, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4$H, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.schoolName ? (openBlock(), createElementBlock("span", _hoisted_5$G, toDisplayString(item.schoolName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.degree ? (openBlock(), createElementBlock("span", _hoisted_6$C, toDisplayString(item.degree), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.specialized ? (openBlock(), createElementBlock("p", _hoisted_7$s, toDisplayString(item.specialized), 1)) : createCommentVNode("", true),
              _ctx.modelData.isShow.majorCourse ? withDirectives((openBlock(), createElementBlock("p", _hoisted_8$n, null, 512)), [
                [_directive_dompurify_html, item.majorCourse]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReEduBackground2 = /* @__PURE__ */ _export_sfc(_sfc_main$2E, [["__scopeId", "data-v-227890d7"]]);
const useGetLineLeft = (modelStyle, num = 15) => {
  const left = computed(() => {
    return pxTonumber(modelStyle.pLeftRight) - num + "px";
  });
  return {
    left
  };
};
const _hoisted_1$2s = { class: "edu-background" };
const _hoisted_2$1x = { class: "edu-list" };
const _hoisted_3$19 = { class: "date-school-box" };
const _hoisted_4$G = { key: 0 };
const _hoisted_5$F = { key: 1 };
const _hoisted_6$B = { key: 2 };
const _hoisted_7$r = {
  key: 0,
  class: "special"
};
const _hoisted_8$m = {
  key: 1,
  class: "majorCourse"
};
const _sfc_main$2D = /* @__PURE__ */ defineComponent({
  __name: "EduBackgroundCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "1fc8b04c": _ctx.modelStyle.pTop,
      "f8c32cf4": _ctx.modelStyle.pBottom,
      "754a4d1a": _ctx.modelStyle.pLeftRight,
      "3628907a": _ctx.modelStyle.mBottom,
      "1fcb6a86": _ctx.modelStyle.mTop,
      "5462df22": _ctx.modelStyle.themeColor,
      "9d673710": unref(left),
      "0da07c1a": _ctx.modelStyle.titleFontSize,
      "4b5e6540": _ctx.modelStyle.titleColor,
      "72da6fea": _ctx.modelStyle.titleFontWeight,
      "e1e5455c": _ctx.modelStyle.textFontSize,
      "73ea9e41": _ctx.modelStyle.textColor,
      "07beaf89": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$2s, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("div", _hoisted_2$1x, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list-item"
            }, [
              createElementVNode("div", _hoisted_3$19, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4$G, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.schoolName ? (openBlock(), createElementBlock("span", _hoisted_5$F, toDisplayString(item.schoolName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.degree ? (openBlock(), createElementBlock("span", _hoisted_6$B, toDisplayString(item.degree), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.specialized ? (openBlock(), createElementBlock("p", _hoisted_7$r, toDisplayString(item.specialized), 1)) : createCommentVNode("", true),
              _ctx.modelData.isShow.majorCourse ? withDirectives((openBlock(), createElementBlock("p", _hoisted_8$m, null, 512)), [
                [_directive_dompurify_html, item.majorCourse]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const EduBackgroundComVue = /* @__PURE__ */ _export_sfc(_sfc_main$2D, [["__scopeId", "data-v-9b68573a"]]);
const _hoisted_1$2r = { class: "model-title-box" };
const _hoisted_2$1w = { class: "icon-box" };
const _hoisted_3$18 = { class: "right-title" };
const _sfc_main$2C = /* @__PURE__ */ defineComponent({
  __name: "ModelTitle",
  props: {
    title: {},
    iconfont: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "b4e9f52a": unref(resumeJsonNewStore).GLOBAL_STYLE.themeColor,
      "caeca02e": unref(resumeJsonNewStore).GLOBAL_STYLE.firstTitleFontSize
    }));
    const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$2r, [
        createElementVNode("div", _hoisted_2$1w, [
          createVNode(_component_svg_icon, {
            "icon-name": _ctx.iconfont,
            color: "#fff",
            size: "15px"
          }, null, 8, ["icon-name"])
        ]),
        createElementVNode("div", _hoisted_3$18, [
          createElementVNode("h1", null, toDisplayString(_ctx.title), 1)
        ])
      ]);
    };
  }
});
const ModelTitleVue = /* @__PURE__ */ _export_sfc(_sfc_main$2C, [["__scopeId", "data-v-a56a38c9"]]);
const _sfc_main$2B = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(EduBackgroundComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _withScopeId$n = (n) => (pushScopeId("data-v-f55a2a43"), n = n(), popScopeId(), n);
const _hoisted_1$2q = { class: "model-title-box" };
const _hoisted_2$1v = { class: "title-box" };
const _hoisted_3$17 = /* @__PURE__ */ _withScopeId$n(() => /* @__PURE__ */ createElementVNode("div", { class: "lozenge-1" }, null, -1));
const _hoisted_4$F = /* @__PURE__ */ _withScopeId$n(() => /* @__PURE__ */ createElementVNode("div", { class: "lozenge-2" }, null, -1));
const _sfc_main$2A = /* @__PURE__ */ defineComponent({
  __name: "ModelTitle",
  props: {
    title: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "7f196e3e": _ctx.modelStyle.themeColor,
      "e3ebc542": _ctx.modelStyle.firstTitleFontSize
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2q, [
        createElementVNode("div", _hoisted_2$1v, [
          createElementVNode("h1", null, toDisplayString(_ctx.title), 1)
        ]),
        _hoisted_3$17,
        _hoisted_4$F
      ]);
    };
  }
});
const ModelTitle$5 = /* @__PURE__ */ _export_sfc(_sfc_main$2A, [["__scopeId", "data-v-f55a2a43"]]);
const _hoisted_1$2p = { class: "edu-background" };
const _hoisted_2$1u = { class: "edu-list" };
const _hoisted_3$16 = { class: "date-school-box" };
const _hoisted_4$E = { key: 0 };
const _hoisted_5$E = { key: 1 };
const _hoisted_6$A = { key: 2 };
const _hoisted_7$q = {
  key: 0,
  class: "special"
};
const _hoisted_8$l = {
  key: 1,
  class: "majorCourse"
};
const _sfc_main$2z = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "20c5582d": _ctx.modelStyle.pTop,
      "767c7453": _ctx.modelStyle.pBottom,
      "3295332d": _ctx.modelStyle.pLeftRight,
      "506c7ae0": _ctx.modelStyle.mBottom,
      "20c3fb10": _ctx.modelStyle.mTop,
      "d9cd12fc": _ctx.modelStyle.themeColor,
      "df24abf6": unref(left),
      "283bbf00": _ctx.modelStyle.titleFontSize,
      "08a94b53": _ctx.modelStyle.titleColor,
      "0edb5db7": _ctx.modelStyle.titleFontWeight,
      "25370aa5": _ctx.modelStyle.textFontSize,
      "277129ce": _ctx.modelStyle.textColor,
      "8b9b57c8": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$2p, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("div", _hoisted_2$1u, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list-item"
            }, [
              createElementVNode("div", _hoisted_3$16, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4$E, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.schoolName ? (openBlock(), createElementBlock("span", _hoisted_5$E, toDisplayString(item.schoolName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.degree ? (openBlock(), createElementBlock("span", _hoisted_6$A, toDisplayString(item.degree), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.specialized ? (openBlock(), createElementBlock("p", _hoisted_7$q, toDisplayString(item.specialized), 1)) : createCommentVNode("", true),
              _ctx.modelData.isShow.majorCourse ? withDirectives((openBlock(), createElementBlock("p", _hoisted_8$l, null, 512)), [
                [_directive_dompurify_html, item.majorCourse]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReEduBackground4 = /* @__PURE__ */ _export_sfc(_sfc_main$2z, [["__scopeId", "data-v-ddf90c02"]]);
const _hoisted_1$2o = { class: "model-title-box" };
const _hoisted_2$1t = { class: "title-box" };
const _sfc_main$2y = /* @__PURE__ */ defineComponent({
  __name: "ModelTitle",
  props: {
    title: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "191cbf07": _ctx.modelStyle.themeColor,
      "89f3e4f6": _ctx.modelStyle.firstTitleFontSize
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2o, [
        createElementVNode("div", _hoisted_2$1t, [
          createElementVNode("h1", null, toDisplayString(_ctx.title), 1)
        ])
      ]);
    };
  }
});
const ModelTitle$4 = /* @__PURE__ */ _export_sfc(_sfc_main$2y, [["__scopeId", "data-v-5d143b35"]]);
const _hoisted_1$2n = { class: "edu-background" };
const _hoisted_2$1s = { class: "edu-list" };
const _hoisted_3$15 = { class: "date-school-box" };
const _hoisted_4$D = { key: 0 };
const _hoisted_5$D = { key: 1 };
const _hoisted_6$z = { key: 2 };
const _hoisted_7$p = {
  key: 0,
  class: "special"
};
const _hoisted_8$k = {
  key: 1,
  class: "majorCourse"
};
const _sfc_main$2x = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "11d60e82": _ctx.modelStyle.pTop,
      "12cb3281": _ctx.modelStyle.pBottom,
      "3c0ac382": _ctx.modelStyle.pLeftRight,
      "741880be": _ctx.modelStyle.mBottom,
      "11d8c8bc": _ctx.modelStyle.mTop,
      "427ee194": _ctx.modelStyle.themeColor,
      "435cb0b3": unref(left),
      "3362a2ae": _ctx.modelStyle.titleFontSize,
      "8fe29336": _ctx.modelStyle.titleColor,
      "284fe436": _ctx.modelStyle.titleFontWeight,
      "de240d92": _ctx.modelStyle.textFontSize,
      "29edd708": _ctx.modelStyle.textColor,
      "13e7e62e": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$2n, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("div", _hoisted_2$1s, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list-item"
            }, [
              createElementVNode("div", _hoisted_3$15, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4$D, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.schoolName ? (openBlock(), createElementBlock("span", _hoisted_5$D, toDisplayString(item.schoolName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.degree ? (openBlock(), createElementBlock("span", _hoisted_6$z, toDisplayString(item.degree), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.specialized ? (openBlock(), createElementBlock("p", _hoisted_7$p, toDisplayString(item.specialized), 1)) : createCommentVNode("", true),
              _ctx.modelData.isShow.majorCourse ? withDirectives((openBlock(), createElementBlock("p", _hoisted_8$k, null, 512)), [
                [_directive_dompurify_html, item.majorCourse]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReEduBackground5 = /* @__PURE__ */ _export_sfc(_sfc_main$2x, [["__scopeId", "data-v-95524089"]]);
const _imports_0$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiNjg3NzY2Mi0wYzY2LWIxNGEtODM1ZS03MTIyNmQxMTVhYjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjA4MUI0MUE1QTZGMTFFODk3OTZEMkY2M0NEMUNDNjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjA4MUI0MTk1QTZGMTFFODk3OTZEMkY2M0NEMUNDNjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc3YjFkYWY4LTgzMTEtYjU0YS1hMjc2LTRmMDE5OGQ1YzA3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpiNjg3NzY2Mi0wYzY2LWIxNGEtODM1ZS03MTIyNmQxMTVhYjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5VHgzxAAAALUlEQVR42mLkLtj7n4GKgImByoDqBrIAMeOgdyElkcI4GikDFymMwyenAAQYANcyBFs3hPoJAAAAAElFTkSuQmCC";
const _withScopeId$m = (n) => (pushScopeId("data-v-bae2a91d"), n = n(), popScopeId(), n);
const _hoisted_1$2m = { class: "model-title-box" };
const _hoisted_2$1r = { class: "title-box" };
const _hoisted_3$14 = /* @__PURE__ */ _withScopeId$m(() => /* @__PURE__ */ createElementVNode("img", {
  src: _imports_0$1,
  alt: ""
}, null, -1));
const _sfc_main$2w = /* @__PURE__ */ defineComponent({
  __name: "ModelTitle",
  props: {
    title: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "0109079e": _ctx.modelStyle.firstTitleFontSize,
      "a5dccc9a": _ctx.modelStyle.themeColor
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2m, [
        createElementVNode("div", _hoisted_2$1r, [
          createElementVNode("h1", null, toDisplayString(_ctx.title), 1),
          _hoisted_3$14
        ])
      ]);
    };
  }
});
const ModelTitle$3 = /* @__PURE__ */ _export_sfc(_sfc_main$2w, [["__scopeId", "data-v-bae2a91d"]]);
const _hoisted_1$2l = { class: "edu-background-content" };
const _hoisted_2$1q = { class: "edu-list" };
const _hoisted_3$13 = { class: "date-school-box" };
const _hoisted_4$C = {
  key: 0,
  class: "start-end-date"
};
const _hoisted_5$C = { key: 1 };
const _hoisted_6$y = { key: 2 };
const _hoisted_7$o = {
  key: 0,
  class: "special"
};
const _hoisted_8$j = {
  key: 1,
  class: "majorCourse"
};
const _sfc_main$2v = /* @__PURE__ */ defineComponent({
  __name: "EduBackground1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "17e20ad8": _ctx.modelStyle.titleFontSize,
      "c45b630a": _ctx.modelStyle.titleColor,
      "a3c3d8e2": _ctx.modelStyle.titleFontWeight,
      "142be3cd": _ctx.modelStyle.textFontSize,
      "450721a6": _ctx.modelStyle.textColor,
      "8154f978": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$2l, [
        createElementVNode("div", _hoisted_2$1q, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list-item"
            }, [
              createElementVNode("div", _hoisted_3$13, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4$C, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.schoolName ? (openBlock(), createElementBlock("span", _hoisted_5$C, toDisplayString(item.schoolName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.degree ? (openBlock(), createElementBlock("span", _hoisted_6$y, toDisplayString(item.degree), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.specialized ? (openBlock(), createElementBlock("p", _hoisted_7$o, toDisplayString(item.specialized), 1)) : createCommentVNode("", true),
              _ctx.modelData.isShow.majorCourse ? withDirectives((openBlock(), createElementBlock("p", _hoisted_8$j, null, 512)), [
                [_directive_dompurify_html, item.majorCourse]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const EduBackground1Vue$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2v, [["__scopeId", "data-v-f24df6b6"]]);
const _hoisted_1$2k = { class: "edu-background" };
const _sfc_main$2u = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "27276260": _ctx.modelStyle.pTop,
      "417d5940": _ctx.modelStyle.pBottom,
      "20b4e9c0": _ctx.modelStyle.pLeftRight,
      "ba6ab106": _ctx.modelStyle.mBottom,
      "27260543": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2k, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createVNode(EduBackground1Vue$1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReEduBackground6 = /* @__PURE__ */ _export_sfc(_sfc_main$2u, [["__scopeId", "data-v-62ec4d8c"]]);
const _hoisted_1$2j = { class: "model-title-box" };
const _hoisted_2$1p = { class: "title-box" };
const _sfc_main$2t = /* @__PURE__ */ defineComponent({
  __name: "ModelTitle",
  props: {
    title: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "17c613e4": _ctx.modelStyle.firstTitleFontSize,
      "21c6d734": _ctx.modelStyle.themeColor
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2j, [
        createElementVNode("div", _hoisted_2$1p, [
          createElementVNode("h1", null, toDisplayString(_ctx.title), 1)
        ])
      ]);
    };
  }
});
const ModelTitle$2 = /* @__PURE__ */ _export_sfc(_sfc_main$2t, [["__scopeId", "data-v-35056245"]]);
const _hoisted_1$2i = { class: "edu-background" };
const _sfc_main$2s = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "b01f137e": _ctx.modelStyle.pTop,
      "291dadbf": _ctx.modelStyle.pBottom,
      "eb231b7e": _ctx.modelStyle.pLeftRight,
      "eb2a0808": _ctx.modelStyle.mBottom,
      "b021cdb8": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2i, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createVNode(EduBackground1Vue$1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReEduBackground7 = /* @__PURE__ */ _export_sfc(_sfc_main$2s, [["__scopeId", "data-v-928c204f"]]);
const _hoisted_1$2h = { class: "edu-background" };
const _hoisted_2$1o = { class: "model-border-box" };
const _hoisted_3$12 = { class: "icon-box" };
const _sfc_main$2r = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "465e7573": _ctx.modelStyle.pLeftRight,
      "0c25e9d6": _ctx.modelStyle.mTop,
      "dd59d3ec": _ctx.modelStyle.mBottom,
      "b23a8e70": _ctx.modelStyle.themeColor,
      "3005c7cd": _ctx.modelStyle.pBottom,
      "0c2746f3": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$2h, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("div", _hoisted_2$1o, [
          createElementVNode("div", _hoisted_3$12, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(EduBackground1Vue$1, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReEduBackground8 = /* @__PURE__ */ _export_sfc(_sfc_main$2r, [["__scopeId", "data-v-746f551f"]]);
const _hoisted_1$2g = { class: "edu-background-content" };
const _hoisted_2$1n = { class: "edu-list" };
const _hoisted_3$11 = { class: "date-school-box" };
const _hoisted_4$B = {
  key: 0,
  class: "start-end-date"
};
const _hoisted_5$B = {
  key: 1,
  class: "school-name"
};
const _hoisted_6$x = { key: 2 };
const _hoisted_7$n = { key: 3 };
const _hoisted_8$i = {
  key: 0,
  class: "majorCourse"
};
const _sfc_main$2q = /* @__PURE__ */ defineComponent({
  __name: "EduBackground2",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "579857ce": _ctx.modelStyle.titleFontSize,
      "5f1a1545": _ctx.modelStyle.titleColor,
      "4d1609f6": _ctx.modelStyle.titleFontWeight,
      "bac5bfd2": _ctx.modelStyle.textFontSize,
      "50b34cc8": _ctx.modelStyle.textColor,
      "7668d50e": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$2g, [
        createElementVNode("div", _hoisted_2$1n, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list-item"
            }, [
              createElementVNode("div", _hoisted_3$11, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4$B, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.schoolName ? (openBlock(), createElementBlock("span", _hoisted_5$B, toDisplayString(item.schoolName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.specialized ? (openBlock(), createElementBlock("span", _hoisted_6$x, toDisplayString(item.specialized), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.degree ? (openBlock(), createElementBlock("span", _hoisted_7$n, toDisplayString(item.degree), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.majorCourse ? withDirectives((openBlock(), createElementBlock("p", _hoisted_8$i, null, 512)), [
                [_directive_dompurify_html, item.majorCourse]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const EduBackground1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$2q, [["__scopeId", "data-v-4cc94c24"]]);
const _hoisted_1$2f = { class: "edu-background" };
const _hoisted_2$1m = { class: "model-border-box" };
const _hoisted_3$10 = { class: "icon-box" };
const _sfc_main$2p = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "490fafed": _ctx.modelStyle.pLeftRight,
      "510b07d0": _ctx.modelStyle.mTop,
      "18230460": _ctx.modelStyle.mBottom,
      "acd8197c": _ctx.modelStyle.themeColor,
      "dabda0da": _ctx.modelStyle.pBottom,
      "510c64ed": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$2f, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("div", _hoisted_2$1m, [
          createElementVNode("div", _hoisted_3$10, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(EduBackground1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReEduBackground9 = /* @__PURE__ */ _export_sfc(_sfc_main$2p, [["__scopeId", "data-v-6294ce7f"]]);
const _hoisted_1$2e = { class: "template2-model-title" };
const _hoisted_2$1l = { class: "right-title" };
const _sfc_main$2o = /* @__PURE__ */ defineComponent({
  __name: "ModelTitle",
  props: {
    title: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "6e4222e0": _ctx.modelStyle.firstTitleFontSize,
      "4fe0db12": _ctx.modelStyle.themeColor
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2e, [
        createElementVNode("div", _hoisted_2$1l, [
          createElementVNode("h1", null, toDisplayString(_ctx.title), 1)
        ])
      ]);
    };
  }
});
const ModelTitle$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2o, [["__scopeId", "data-v-b679a89d"]]);
const _hoisted_1$2d = { class: "edu-background-content" };
const _hoisted_2$1k = { class: "edu-list" };
const _hoisted_3$$ = { class: "date-school-box" };
const _hoisted_4$A = {
  key: 0,
  class: "start-end-date"
};
const _hoisted_5$A = {
  key: 1,
  class: "school-name"
};
const _hoisted_6$w = {
  key: 2,
  class: "specialized-name"
};
const _hoisted_7$m = { key: 3 };
const _hoisted_8$h = {
  key: 0,
  class: "majorCourse"
};
const _sfc_main$2n = /* @__PURE__ */ defineComponent({
  __name: "EduBackground3",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "cc0a95e8": _ctx.modelStyle.titleFontSize,
      "d27e1e72": _ctx.modelStyle.titleColor,
      "0cb500c3": _ctx.modelStyle.titleFontWeight,
      "e809b9ce": _ctx.modelStyle.textFontSize,
      "65d505da": _ctx.modelStyle.textColor,
      "ff5bc0e0": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$2d, [
        createElementVNode("div", _hoisted_2$1k, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list-item"
            }, [
              createElementVNode("li", _hoisted_3$$, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4$A, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.schoolName ? (openBlock(), createElementBlock("span", _hoisted_5$A, toDisplayString(item.schoolName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.specialized ? (openBlock(), createElementBlock("span", _hoisted_6$w, toDisplayString(item.specialized), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.degree ? (openBlock(), createElementBlock("span", _hoisted_7$m, toDisplayString(item.degree), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.majorCourse ? withDirectives((openBlock(), createElementBlock("p", _hoisted_8$h, null, 512)), [
                [_directive_dompurify_html, item.majorCourse]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const EduBackground3Vue = /* @__PURE__ */ _export_sfc(_sfc_main$2n, [["__scopeId", "data-v-0ce3b6ed"]]);
const _hoisted_1$2c = { class: "edu-background" };
const _sfc_main$2m = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "28f67c9b": _ctx.modelStyle.pTop,
      "758a5db6": _ctx.modelStyle.pBottom,
      "a56e65ca": _ctx.modelStyle.pLeftRight,
      "26881f62": _ctx.modelStyle.mBottom,
      "28f51f7e": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2c, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createVNode(EduBackground3Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReEduBackground10 = /* @__PURE__ */ _export_sfc(_sfc_main$2m, [["__scopeId", "data-v-482acf26"]]);
const _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAsCAMAAADGmMENAAAAsVBMVEUAAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAB01PBwAAAAO3RSTlMA6eX04O3w3NTY+Me2u3L9z8O/VIN3y6CHpItgZl1+m5NqWLCoTwerjwSXbXsKSTutFGMcREAOKCI2Lh0JcuoAAAS3SURBVDjLjVQHktswDDTBLqr3ZnV3x/18ufz/YYHjc8pMMhO4iNQsiN0FydkzlptjldSb2X/FPi7bbJriL/8D3sWn4mSC0S63d5we9rcv93+CvzanVik/CIOwu27uQ+eMbVEnh+qvpdyy7EBp5vu+fdxtc8dZZaOdl23zF/A8c8KU+YppFq7X3eQEfsDoyV61ZXKMDu7id/A9z8IxZQwo0+PWduw0lUql3EzpKc9brHD4DX3dpsYhFOFMgx8YrQ0oJVPf2GEYOkW+dvtfAqLMNiEjQCgB5kgKlFCugCgig8BAGhZj7v5EJ1noawAhOBCBD59yTxDpAcNaMgB/KrLyxf2LWxRGgiAW4ZRRKaWmgnJKGcKVRZX0i6xtNi+zjROkCgTiOdbAf/xSSoVmWkimFTOrdh094f00hY4BJoBgAhcSJOGcUBxLQlLGGVFmejGv7VOG5Ah4VAAHnmqNiZwwEEphGiF+GpzyOPqBHrpxNEpRYBZlgjPlCSkYsRjRGpiiVBOOTSuTp+tNsTJBKBkRlALS8QT1BKco2SNSCAvlB8YZC/cpM2nHAD20KFjoNEI9agHnFoCkWAMnZtK5s/80fGsrZbQEpQhDQ6iwLA8ICuUCFLWY5UMQFPETfYyLUxgaFCYtqjnxLO/RTqxBCErHCWOOXeTPQ3ZzsykMUy2VkRYQEJR4BD3EpxBgPSgpe9UsnrznSbl1VKhTwsES+GMeBVTnedzyiAeCsMBu2yeTj6hv1naraMAoOg2S46IEh56wqEU9ykAZ357iG4I3x3ndZLivA8WwvpYcKEoELtA66XEhvJRrFa7y8w+R1R6pbO0wlT5DXZJpSRlqxmQqAXMIc1Tq5LcH+n2o+jjeFpMdBBRkyoRIgUtOCecGoeiMVPZUZl8f6POh7psm77pi9H0TKAukQh8VoB0SyXMiA8fexp9+v18u8b7MS9sOdKiZB+BLXFZQDUyjBu2HvrNKrk/0t8V83+TruNuemOSGUwBQHEDjg6Hnxg6KbBu9Ts9xcPMkLnNskrIYYMMlLulbIKRmDOww2K/7zez+SWVR5fu4W3cnFeCqAgTB4L4kGrQwZuz2VblW/hN+fhv6BC/ObsrATwmxNJcMSMCYkjKQqy7rkvczS5ZPKu8Ldxfv42adOUYBk4xroErbBmzcIU6W9cNGux8v5h/Dzk3ipmlt6T8OPQfPSv0idPxVka1Wq20yDsuf11XU9+4+d8s4L1rsqeaAhEzQmdA4jhOX9dU5z17xDXnvkjp2k9Jdd/ZoDNHMR1bF2E1dUh3iabN5gbGdUV33tZu4fd8keYYG2Hjv5i2Kmd+WH/bHg8byy/sP9OY2zKNL79ZJv9slieu6211XrMsmGaL3zTLbnWf35cHm5pNKFfXz6rKr68i9uLvBxSS3duvF23lzS51sdLL8unIXLyrzal5V8/mlfwyiy6Weu/U8irD2Pg3terNc/LqVl2/DA1rV1TAfLkNUuVVV1+FYtPW3WdLsdp/Ql4eHRbTAteZDtIgwqmFRuZmzWhXtcbn8DfjaiFEVHRZvb0f83B6Z80WTt6d1fJ79Je7H6/nLfbmZLWeb6/X4Ft2+LuOmxH7/Ryx/MP369ufb71K8ce86iwiYAAAAAElFTkSuQmCC";
const _imports_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAACECAMAAACEaqqpAAAA+VBMVEX///8AAAAEAQAGAwMKCQgDAAAODQwHBgUaGRatpqJMRUEFAgISEhAhHxwnJCGCeXMDAAAJCQgMCwoPDw3Py8gDAAAHBgUDAAA6NDFhWVSOhoEEAQAFAQEHBAQHBQQJCAcWFRMDAAADAAAyLSlHQDwDAAAEAAAFAQEHBAQMCwoQEA4TExIdHBktKSZVTUgDAADf3NoDAAADAAAFAgIYFxUxLCk1MS0DAABAOjYDAABeVlHl4+EDAAADAAD///8DAAADAAADAAAcGxkfHRsMCwoDAAArJiQDAAADAAADAABsZF5uZWADAACako2qo5+6tLAxLCkDAAADAABg+RdSAAAAUnRSTlMtAPTmzQ7C25w5Xeq1j4RFCdDGvTMd2JdtUUH48eTe1Kmek3ZiGPru4cm6r5Z+WDYxBLaxonlyamdXUzAtEw+/paKbkoeHgIB+XUxLRT06NzYnB36+/QAAAbhJREFUKM+F0VdT4zAUBeAjW7LjsnGNEzshlTRIAgEWlrq9d/3/H7NXuvvAAzP4wd+cO8d35BFwCfu0mZdMj/nFbJhiZt6/pVsaD/TQ4GhtylrrFnBDFLSEkMCW8IH3xAho2SFT4pjwGsQ8LLjpEU6NNaHbkIYXGBm28G1iNkwL7vMMDO/g8OdLxnmO9hM4M+bSIkOmthSJxcMTjJiKK9EO2mx5ZemHvPM/M8ugx80eIkL3+Fdu+CyHTAjXwmlH2J1Lww4H3HT58MNHqbY7+4mtRI0d+gkGBthhBTuMGS9gSlTEUQmPOIa5v8UWNrWBESOJT7fmcvqzANLRzmGAvK/9ECYNA4sLIHd1RBQDS+zqlaHS61NgnOm8ISqdA2j5Og6A0F/Ib0TmZA2QDLWsS9SrhRcCwdJdfScyP0oCBGuZATiVfk7Acz3Q0jiLUQJHssAtEV8gAfKLMX4CctxCQ01vgwAP8vzDwx+Is/PPogPxenKVEmfTa0V0uydiDvGme6/uISbTuTDDj0ooiOlkLvYQV0QK8fWtHf6YpkJA3HVTRZx8UcJwrUzq/BUmqTumk+6JVHFS+1T8A01deG7nxZpjAAAAAElFTkSuQmCC";
const _hoisted_1$2b = { class: "model-title-9-box" };
const _hoisted_2$1j = { class: "title-box" };
const _sfc_main$2l = /* @__PURE__ */ defineComponent({
  __name: "ModelTitle",
  props: {
    title: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "46d1c7e3": _ctx.modelStyle.firstTitleFontSize,
      "2a3fb765": _ctx.modelStyle.themeColor
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2b, [
        createElementVNode("div", _hoisted_2$1j, [
          createElementVNode("h1", null, toDisplayString(_ctx.title), 1)
        ])
      ]);
    };
  }
});
const ModelTitle = /* @__PURE__ */ _export_sfc(_sfc_main$2l, [["__scopeId", "data-v-dded72f1"]]);
const _withScopeId$l = (n) => (pushScopeId("data-v-bd6b2c1e"), n = n(), popScopeId(), n);
const _hoisted_1$2a = { class: "edu-background-11-box" };
const _hoisted_2$1i = { class: "edubackground-11-content-box" };
const _hoisted_3$_ = /* @__PURE__ */ _withScopeId$l(() => /* @__PURE__ */ createElementVNode("div", { class: "left" }, [
  /* @__PURE__ */ createElementVNode("img", {
    src: _imports_0,
    alt: "列表"
  }),
  /* @__PURE__ */ createElementVNode("img", {
    class: "moduleborder",
    src: _imports_1,
    alt: "边框"
  })
], -1));
const _sfc_main$2k = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "24ad47a2": _ctx.modelStyle.pTop,
      "020f54be": _ctx.modelStyle.pBottom,
      "e872123c": _ctx.modelStyle.pLeftRight,
      "24abea85": _ctx.modelStyle.mTop,
      "635ca2fb": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2a, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$1i, [
          _hoisted_3$_,
          createVNode(EduBackground1Vue$1, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReEduBackground11 = /* @__PURE__ */ _export_sfc(_sfc_main$2k, [["__scopeId", "data-v-bd6b2c1e"]]);
const _withScopeId$k = (n) => (pushScopeId("data-v-e08c8efe"), n = n(), popScopeId(), n);
const _hoisted_1$29 = { class: "edu-background-12-box" };
const _hoisted_2$1h = { class: "edubackground-11-content-box" };
const _hoisted_3$Z = /* @__PURE__ */ _withScopeId$k(() => /* @__PURE__ */ createElementVNode("div", { class: "left" }, [
  /* @__PURE__ */ createElementVNode("img", {
    src: _imports_0,
    alt: "列表"
  }),
  /* @__PURE__ */ createElementVNode("img", {
    class: "moduleborder",
    src: _imports_1,
    alt: "边框"
  })
], -1));
const _sfc_main$2j = /* @__PURE__ */ defineComponent({
  __name: "EduBackground",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "818e1d1a": _ctx.modelStyle.pTop,
      "b653e566": _ctx.modelStyle.pBottom,
      "01b3801a": _ctx.modelStyle.pLeftRight,
      "8190d754": _ctx.modelStyle.mTop,
      "06235b8a": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$29, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$1h, [
          _hoisted_3$Z,
          createVNode(EduBackground1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReEduBackground12 = /* @__PURE__ */ _export_sfc(_sfc_main$2j, [["__scopeId", "data-v-e08c8efe"]]);
const _hoisted_1$28 = { class: "user-info-1-box" };
const _hoisted_2$1g = { class: "user-abstract" };
const _hoisted_3$Y = { class: "bottom" };
const _sfc_main$2i = /* @__PURE__ */ defineComponent({
  __name: "UserInfo1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "69e6d732": _ctx.modelStyle.titleFontSize,
      "7e931f3e": _ctx.modelStyle.titleColor,
      "dbbd9d2e": _ctx.modelStyle.titleFontWeight,
      "8c77aa00": _ctx.modelStyle.textColor,
      "0e8f2433": _ctx.modelStyle.textFontSize,
      "a42b7bac": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const isShow = reactive(props.modelData.isShow);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$28, [
        createElementVNode("h1", null, toDisplayString(_ctx.modelData.name), 1),
        withDirectives(createElementVNode("p", _hoisted_2$1g, null, 512), [
          [vShow, unref(isShow).abstract],
          [_directive_dompurify_html, _ctx.modelData.abstract]
        ]),
        createElementVNode("div", _hoisted_3$Y, [
          createElementVNode("ul", null, [
            withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.age) + "岁", 513), [
              [vShow, unref(isShow).age]
            ]),
            withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.address), 513), [
              [vShow, unref(isShow).address]
            ]),
            withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.workService) + "年经验", 513), [
              [vShow, unref(isShow).workService]
            ]),
            withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.phoneNumber), 513), [
              [vShow, unref(isShow).phoneNumber]
            ]),
            withDirectives(createElementVNode("li", null, toDisplayString(_ctx.modelData.email), 513), [
              [vShow, unref(isShow).email]
            ])
          ])
        ])
      ]);
    };
  }
});
const UserInfo1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$2i, [["__scopeId", "data-v-dde43afc"]]);
const avatarComponents = {
  SQUARE_AVATAR,
  RECTANGLE_AVATAR,
  CIRCLE_AVATAR
};
const _hoisted_1$27 = {
  key: 0,
  class: "avatar-box"
};
const _hoisted_2$1f = {
  key: 1,
  class: "avatar-shape-box"
};
const _sfc_main$2h = /* @__PURE__ */ defineComponent({
  __name: "avatar1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    const props = __props;
    const isShow = reactive(props.modelData.isShow);
    return (_ctx, _cache) => {
      const _component_el_image = resolveComponent("el-image");
      return !_ctx.modelData.avatarShape ? withDirectives((openBlock(), createElementBlock("div", _hoisted_1$27, [
        createVNode(_component_el_image, {
          style: { "width": "115px", "height": "145px" },
          src: _ctx.modelData.avatar
        }, null, 8, ["src"])
      ], 512)), [
        [vShow, unref(isShow).avatar]
      ]) : withDirectives((openBlock(), createElementBlock("div", _hoisted_2$1f, [
        (openBlock(), createBlock(resolveDynamicComponent(unref(avatarComponents)[_ctx.modelData.avatarShape]), { "model-data": _ctx.modelData }, null, 8, ["model-data"]))
      ], 512)), [
        [vShow, unref(isShow).avatar]
      ]);
    };
  }
});
const avatar1 = /* @__PURE__ */ _export_sfc(_sfc_main$2h, [["__scopeId", "data-v-467d4453"]]);
const _hoisted_1$26 = { class: "base-info-common-1-box" };
const _hoisted_2$1e = { class: "user-info" };
const _hoisted_3$X = { class: "top" };
const _sfc_main$2g = /* @__PURE__ */ defineComponent({
  __name: "BaseInfo1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2ba02f76": _ctx.modelStyle.pTop,
      "b181272c": _ctx.modelStyle.pBottom,
      "b94ca094": _ctx.modelStyle.pLeftRight,
      "088cbaa7": _ctx.modelStyle.mBottom,
      "2b9ed259": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$26, [
        createElementVNode("div", _hoisted_2$1e, [
          createElementVNode("div", _hoisted_3$X, [
            createVNode(avatar1, {
              "model-data": _ctx.modelData,
              "model-style": _ctx.modelStyle
            }, null, 8, ["model-data", "model-style"]),
            createVNode(UserInfo1Vue, {
              "model-data": _ctx.modelData,
              "model-style": _ctx.modelStyle
            }, null, 8, ["model-data", "model-style"])
          ])
        ])
      ]);
    };
  }
});
const BaseInfo1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$2g, [["__scopeId", "data-v-0bd79b1b"]]);
const _hoisted_1$25 = { class: "base-info-1-box" };
const _sfc_main$2f = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$25, [
        createVNode(BaseInfo1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const _hoisted_1$24 = { class: "user-info" };
const _hoisted_2$1d = { class: "li-border" };
const _hoisted_3$W = { class: "li-border" };
const _hoisted_4$z = { class: "li-border" };
const _hoisted_5$z = { class: "li-border" };
const _sfc_main$2e = /* @__PURE__ */ defineComponent({
  __name: "UserInfo2",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "48cb2622": _ctx.modelStyle.textColor,
      "4bf1bdd1": _ctx.modelStyle.textFontSize,
      "1d0cec48": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const isShow = reactive(props.modelData.isShow);
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$24, [
        createElementVNode("ul", null, [
          withDirectives(createElementVNode("li", _hoisted_2$1d, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-renwu-ren",
              color: "#fff"
            }),
            createElementVNode("span", null, toDisplayString(_ctx.modelData.age) + "岁", 1)
          ], 512), [
            [vShow, unref(isShow).age]
          ]),
          withDirectives(createElementVNode("li", _hoisted_3$W, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-dizhi",
              color: "#fff",
              size: "16px"
            }),
            createElementVNode("span", null, toDisplayString(_ctx.modelData.address), 1)
          ], 512), [
            [vShow, unref(isShow).address]
          ]),
          withDirectives(createElementVNode("li", _hoisted_4$z, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-gongzuojingyan",
              color: "#fff"
            }),
            createElementVNode("span", null, toDisplayString(_ctx.modelData.workService) + "年经验", 1)
          ], 512), [
            [vShow, unref(isShow).workService]
          ]),
          withDirectives(createElementVNode("li", _hoisted_5$z, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-dianhua1",
              color: "#fff"
            }),
            createElementVNode("span", null, toDisplayString(_ctx.modelData.phoneNumber), 1)
          ], 512), [
            [vShow, unref(isShow).phoneNumber]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-youxiang",
              color: "#fff"
            }),
            createElementVNode("span", null, toDisplayString(_ctx.modelData.email), 1)
          ], 512), [
            [vShow, unref(isShow).email]
          ])
        ])
      ]);
    };
  }
});
const UserInfo2Vue = /* @__PURE__ */ _export_sfc(_sfc_main$2e, [["__scopeId", "data-v-2f8bf68f"]]);
const _hoisted_1$23 = { class: "base-info-common-2-box" };
const _hoisted_2$1c = { class: "avatar-wrapper" };
const _sfc_main$2d = /* @__PURE__ */ defineComponent({
  __name: "BaseInfo2",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "56331006": _ctx.modelStyle.pTop,
      "018201da": _ctx.modelStyle.pBottom,
      "4dc5e446": _ctx.modelStyle.pLeftRight,
      "62cf5017": _ctx.modelStyle.mBottom,
      "5631b2e9": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$23, [
        createElementVNode("div", _hoisted_2$1c, [
          createVNode(avatar1, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ]),
        createVNode(UserInfo2Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const BaseInfo2Vue = /* @__PURE__ */ _export_sfc(_sfc_main$2d, [["__scopeId", "data-v-03d78980"]]);
const _hoisted_1$22 = { class: "base-info-2-box" };
const _sfc_main$2c = /* @__PURE__ */ defineComponent({
  __name: "BaseInfo",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$22, [
        createVNode(BaseInfo2Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const _hoisted_1$21 = { class: "user-info" };
const _hoisted_2$1b = { class: "head" };
const _hoisted_3$V = { class: "detail" };
const _sfc_main$2b = /* @__PURE__ */ defineComponent({
  __name: "UserInfo3",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "695faf25": _ctx.modelStyle.titleFontSize,
      "161ed54e": _ctx.modelStyle.titleColor,
      "d2784ec8": _ctx.modelStyle.titleFontWeight,
      "a91bfc40": _ctx.modelStyle.textFontSize,
      "c4e72ed2": _ctx.modelStyle.textFontWeight,
      "7a74f473": _ctx.modelStyle.textColor
    }));
    const props = __props;
    const isShow = reactive(props.modelData.isShow);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$21, [
        createElementVNode("div", _hoisted_2$1b, [
          createElementVNode("h1", null, toDisplayString(_ctx.modelData.name), 1),
          withDirectives(createElementVNode("p", null, null, 512), [
            [vShow, unref(isShow).abstract],
            [_directive_dompurify_html, _ctx.modelData.abstract]
          ])
        ]),
        createElementVNode("div", _hoisted_3$V, [
          createElementVNode("ul", null, [
            withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.age) + "岁", 513), [
              [vShow, unref(isShow).age]
            ]),
            withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.address), 513), [
              [vShow, unref(isShow).address]
            ]),
            withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.workService) + "年经验", 513), [
              [vShow, unref(isShow).workService]
            ]),
            withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.phoneNumber), 513), [
              [vShow, unref(isShow).phoneNumber]
            ]),
            withDirectives(createElementVNode("li", null, toDisplayString(_ctx.modelData.email), 513), [
              [vShow, unref(isShow).email]
            ])
          ])
        ])
      ]);
    };
  }
});
const UserInfo3Vue = /* @__PURE__ */ _export_sfc(_sfc_main$2b, [["__scopeId", "data-v-55f03996"]]);
const _hoisted_1$20 = { class: "base-info-common-2-box" };
const _sfc_main$2a = /* @__PURE__ */ defineComponent({
  __name: "BaseInfo3",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "ba9fb44e": _ctx.modelStyle.mBottom,
      "b166f732": _ctx.modelStyle.mTop,
      "b1643cf8": _ctx.modelStyle.pTop,
      "4162d79c": _ctx.modelStyle.pBottom,
      "39ddc178": _ctx.modelStyle.pLeftRight
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$20, [
        createVNode(UserInfo3Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"]),
        createVNode(avatar1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const BaseInfo3Vue = /* @__PURE__ */ _export_sfc(_sfc_main$2a, [["__scopeId", "data-v-f25f07e2"]]);
const _hoisted_1$1$ = { class: "base-info-3-box" };
const _sfc_main$29 = /* @__PURE__ */ defineComponent({
  __name: "BaseInfo",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1$, [
        createVNode(BaseInfo3Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const _hoisted_1$1_ = { class: "base-info" };
const _hoisted_2$1a = { class: "user-info" };
const _hoisted_3$U = { class: "left" };
const _hoisted_4$y = { class: "user-abstract" };
const _hoisted_5$y = {
  key: 0,
  class: "avatar-box"
};
const _hoisted_6$v = {
  key: 1,
  class: "avatar-shape-box"
};
const _sfc_main$28 = /* @__PURE__ */ defineComponent({
  __name: "BaseInfo",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "4a567eaf": _ctx.modelStyle.pTop,
      "ae66b2de": _ctx.modelStyle.pBottom,
      "351bf02f": _ctx.modelStyle.pLeftRight,
      "0a19f4ce": _ctx.modelStyle.mBottom,
      "4a552192": _ctx.modelStyle.mTop,
      "d4bf98f8": _ctx.modelStyle.themeColor,
      "0858fe7a": unref(left),
      "25e0cabe": _ctx.modelStyle.titleFontSize,
      "0b300855": _ctx.modelStyle.titleColor,
      "376c71f5": _ctx.modelStyle.titleFontWeight,
      "067dc48c": _ctx.modelStyle.textColor,
      "bdfae1b2": _ctx.modelStyle.textFontSize,
      "712ec01e": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const isShow = reactive(props.modelData.isShow);
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _component_el_image = resolveComponent("el-image");
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1_, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$1a, [
          createElementVNode("div", _hoisted_3$U, [
            createElementVNode("h1", null, toDisplayString(_ctx.modelData.name), 1),
            withDirectives(createElementVNode("p", _hoisted_4$y, null, 512), [
              [vShow, unref(isShow).abstract],
              [_directive_dompurify_html, _ctx.modelData.abstract]
            ]),
            createElementVNode("ul", null, [
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.age) + "岁", 513), [
                [vShow, unref(isShow).age]
              ]),
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.address), 513), [
                [vShow, unref(isShow).address]
              ]),
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.workService) + "年经验", 513), [
                [vShow, unref(isShow).workService]
              ]),
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.phoneNumber), 513), [
                [vShow, unref(isShow).phoneNumber]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(_ctx.modelData.email), 513), [
                [vShow, unref(isShow).email]
              ])
            ])
          ]),
          !_ctx.modelData.avatarShape ? withDirectives((openBlock(), createElementBlock("div", _hoisted_5$y, [
            createVNode(_component_el_image, {
              style: { "width": "115px", "height": "145px" },
              src: _ctx.modelData.avatar
            }, null, 8, ["src"])
          ], 512)), [
            [vShow, unref(isShow).avatar]
          ]) : withDirectives((openBlock(), createElementBlock("div", _hoisted_6$v, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(avatarComponents)[_ctx.modelData.avatarShape]), { "model-data": _ctx.modelData }, null, 8, ["model-data"]))
          ], 512)), [
            [vShow, unref(isShow).avatar]
          ])
        ])
      ]);
    };
  }
});
const ReBaseInfo4 = /* @__PURE__ */ _export_sfc(_sfc_main$28, [["__scopeId", "data-v-78105814"]]);
const _hoisted_1$1Z = { class: "base-info-5-box" };
const _hoisted_2$19 = { class: "user-info" };
const _hoisted_3$T = { class: "left" };
const _hoisted_4$x = { class: "user-abstract" };
const _hoisted_5$x = {
  key: 0,
  class: "avatar-box"
};
const _hoisted_6$u = {
  key: 1,
  class: "avatar-shape-box"
};
const _sfc_main$27 = /* @__PURE__ */ defineComponent({
  __name: "BaseInfo",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "5c5909b5": _ctx.modelStyle.pTop,
      "7ebcf5cb": _ctx.modelStyle.pBottom,
      "7d2f9eb5": _ctx.modelStyle.pLeftRight,
      "3feb77f0": _ctx.modelStyle.mBottom,
      "5c57ac98": _ctx.modelStyle.mTop,
      "44983bec": _ctx.modelStyle.themeColor,
      "5f797310": _ctx.modelStyle.titleFontSize,
      "5343b6db": _ctx.modelStyle.titleColor,
      "59c231a2": _ctx.modelStyle.titleFontWeight,
      "21972d46": _ctx.modelStyle.textColor,
      "32e4b42d": _ctx.modelStyle.textFontSize,
      "131bbba4": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const isShow = reactive(props.modelData.isShow);
    return (_ctx, _cache) => {
      const _component_el_image = resolveComponent("el-image");
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1Z, [
        createElementVNode("div", _hoisted_2$19, [
          createElementVNode("div", _hoisted_3$T, [
            createElementVNode("h1", null, toDisplayString(_ctx.modelData.name), 1),
            withDirectives(createElementVNode("p", _hoisted_4$x, null, 512), [
              [vShow, unref(isShow).abstract],
              [_directive_dompurify_html, _ctx.modelData.abstract]
            ]),
            createElementVNode("ul", null, [
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.age) + "岁", 513), [
                [vShow, unref(isShow).age]
              ]),
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.address), 513), [
                [vShow, unref(isShow).address]
              ]),
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.workService) + "年经验", 513), [
                [vShow, unref(isShow).workService]
              ]),
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.phoneNumber), 513), [
                [vShow, unref(isShow).phoneNumber]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(_ctx.modelData.email), 513), [
                [vShow, unref(isShow).email]
              ])
            ])
          ]),
          !_ctx.modelData.avatarShape ? withDirectives((openBlock(), createElementBlock("div", _hoisted_5$x, [
            createVNode(_component_el_image, {
              style: { "width": "115px", "height": "145px" },
              src: _ctx.modelData.avatar
            }, null, 8, ["src"])
          ], 512)), [
            [vShow, unref(isShow).avatar]
          ]) : withDirectives((openBlock(), createElementBlock("div", _hoisted_6$u, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(avatarComponents)[_ctx.modelData.avatarShape]), { "model-data": _ctx.modelData }, null, 8, ["model-data"]))
          ], 512)), [
            [vShow, unref(isShow).avatar]
          ])
        ])
      ]);
    };
  }
});
const ReBaseInfo5 = /* @__PURE__ */ _export_sfc(_sfc_main$27, [["__scopeId", "data-v-887f0a00"]]);
const _hoisted_1$1Y = { class: "base-info-6-box" };
const _hoisted_2$18 = { class: "user-info" };
const _hoisted_3$S = { class: "top" };
const _hoisted_4$w = {
  key: 0,
  class: "avatar-box"
};
const _hoisted_5$w = {
  key: 1,
  class: "avatar-shape-box"
};
const _hoisted_6$t = { class: "right" };
const _hoisted_7$l = { class: "user-abstract" };
const _hoisted_8$g = { class: "bottom" };
const _sfc_main$26 = /* @__PURE__ */ defineComponent({
  __name: "BaseInfo",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "7f40f30a": _ctx.modelStyle.pTop,
      "eef1df54": _ctx.modelStyle.pBottom,
      "9993176c": _ctx.modelStyle.pLeftRight,
      "2c5742da": _ctx.modelStyle.mBottom,
      "7f3f95ed": _ctx.modelStyle.mTop,
      "14d7e67a": _ctx.modelStyle.titleFontSize,
      "ed6ae720": _ctx.modelStyle.titleColor,
      "3151728c": _ctx.modelStyle.titleFontWeight,
      "028c7882": _ctx.modelStyle.textFontSize,
      "d038828e": _ctx.modelStyle.textFontWeight,
      "3d765dde": _ctx.modelStyle.textColor
    }));
    const props = __props;
    const isShow = reactive(props.modelData.isShow);
    return (_ctx, _cache) => {
      const _component_el_image = resolveComponent("el-image");
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1Y, [
        createElementVNode("div", _hoisted_2$18, [
          createElementVNode("div", _hoisted_3$S, [
            !_ctx.modelData.avatarShape ? withDirectives((openBlock(), createElementBlock("div", _hoisted_4$w, [
              createVNode(_component_el_image, {
                style: { "width": "115px", "height": "115px" },
                src: _ctx.modelData.avatar
              }, null, 8, ["src"])
            ], 512)), [
              [vShow, _ctx.modelData.isShow.avatar]
            ]) : withDirectives((openBlock(), createElementBlock("div", _hoisted_5$w, [
              (openBlock(), createBlock(resolveDynamicComponent(unref(avatarComponents)[_ctx.modelData.avatarShape]), { "model-data": _ctx.modelData }, null, 8, ["model-data"]))
            ], 512)), [
              [vShow, unref(isShow).avatar]
            ]),
            createElementVNode("div", _hoisted_6$t, [
              createElementVNode("h1", null, toDisplayString(_ctx.modelData.name), 1),
              withDirectives(createElementVNode("p", _hoisted_7$l, null, 512), [
                [vShow, unref(isShow).abstract],
                [_directive_dompurify_html, _ctx.modelData.abstract]
              ])
            ])
          ]),
          createElementVNode("div", _hoisted_8$g, [
            createElementVNode("ul", null, [
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.age) + "岁", 513), [
                [vShow, unref(isShow).age]
              ]),
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.address), 513), [
                [vShow, unref(isShow).address]
              ]),
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.workService) + "年经验", 513), [
                [vShow, unref(isShow).workService]
              ]),
              withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.phoneNumber), 513), [
                [vShow, unref(isShow).phoneNumber]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(_ctx.modelData.email), 513), [
                [vShow, unref(isShow).email]
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
const ReBaseInfo6 = /* @__PURE__ */ _export_sfc(_sfc_main$26, [["__scopeId", "data-v-c750a09f"]]);
const _hoisted_1$1X = { class: "base-info-7-box" };
const _hoisted_2$17 = { class: "user-info" };
const _hoisted_3$R = { class: "top" };
const _hoisted_4$v = {
  key: 0,
  class: "avatar-box"
};
const _hoisted_5$v = {
  key: 1,
  class: "avatar-shape-box"
};
const _hoisted_6$s = { class: "right" };
const _hoisted_7$k = { class: "user-abstract" };
const _hoisted_8$f = { class: "bottom" };
const _sfc_main$25 = /* @__PURE__ */ defineComponent({
  __name: "BaseInfo",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "17f2231a": _ctx.modelStyle.pTop,
      "d82a1f66": _ctx.modelStyle.pBottom,
      "2ec27cf3": _ctx.modelStyle.pLeftRight,
      "158f82ec": _ctx.modelStyle.mBottom,
      "17f4dd54": _ctx.modelStyle.mTop,
      "4277d77a": _ctx.modelStyle.titleFontSize,
      "04d69519": _ctx.modelStyle.titleColor,
      "eb19809e": _ctx.modelStyle.titleFontWeight,
      "b99ee170": _ctx.modelStyle.textColor,
      "698e0a2a": _ctx.modelStyle.textFontSize,
      "310d6a3c": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const isShow = reactive(props.modelData.isShow);
    return (_ctx, _cache) => {
      const _component_el_image = resolveComponent("el-image");
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1X, [
        createElementVNode("div", _hoisted_2$17, [
          createElementVNode("div", _hoisted_3$R, [
            !_ctx.modelData.avatarShape ? withDirectives((openBlock(), createElementBlock("div", _hoisted_4$v, [
              createVNode(_component_el_image, {
                style: { "width": "115px", "height": "145px" },
                src: _ctx.modelData.avatar
              }, null, 8, ["src"])
            ], 512)), [
              [vShow, unref(isShow).avatar]
            ]) : withDirectives((openBlock(), createElementBlock("div", _hoisted_5$v, [
              (openBlock(), createBlock(resolveDynamicComponent(unref(avatarComponents)[_ctx.modelData.avatarShape]), { "model-data": _ctx.modelData }, null, 8, ["model-data"]))
            ], 512)), [
              [vShow, unref(isShow).avatar]
            ]),
            createElementVNode("div", _hoisted_6$s, [
              createElementVNode("h1", null, toDisplayString(_ctx.modelData.name), 1),
              withDirectives(createElementVNode("p", _hoisted_7$k, null, 512), [
                [vShow, unref(isShow).abstract],
                [_directive_dompurify_html, _ctx.modelData.abstract]
              ]),
              createElementVNode("div", _hoisted_8$f, [
                createElementVNode("ul", null, [
                  withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.age) + "岁", 513), [
                    [vShow, unref(isShow).age]
                  ]),
                  withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.address), 513), [
                    [vShow, unref(isShow).address]
                  ]),
                  withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.workService) + "年经验", 513), [
                    [vShow, unref(isShow).workService]
                  ]),
                  withDirectives(createElementVNode("li", { class: "li-border" }, toDisplayString(_ctx.modelData.phoneNumber), 513), [
                    [vShow, unref(isShow).phoneNumber]
                  ]),
                  withDirectives(createElementVNode("li", null, toDisplayString(_ctx.modelData.email), 513), [
                    [vShow, unref(isShow).email]
                  ])
                ])
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
const ReBaseInfo7 = /* @__PURE__ */ _export_sfc(_sfc_main$25, [["__scopeId", "data-v-0909efd3"]]);
const _hoisted_1$1W = { class: "base-info-8-box" };
const _sfc_main$24 = /* @__PURE__ */ defineComponent({
  __name: "BaseInfo",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1W, [
        createVNode(BaseInfo1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReBaseInfo8 = /* @__PURE__ */ _export_sfc(_sfc_main$24, [["__scopeId", "data-v-18dd4599"]]);
const _hoisted_1$1V = { class: "job-intention" };
const _sfc_main$23 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "581880d5": _ctx.modelStyle.pTop,
      "a676aaaa": _ctx.modelStyle.pBottom,
      "10013dd5": _ctx.modelStyle.pLeftRight,
      "581723b8": _ctx.modelStyle.mTop,
      "0e11f8e8": _ctx.modelStyle.mBottom,
      "57cb0b4d": _ctx.modelStyle.textFontSize,
      "26f5abb4": _ctx.modelStyle.textColor,
      "d06e6a78": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1V, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("ul", null, [
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-gongzuoleixing",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(" " + toDisplayString(_ctx.modelData.jobSearchType), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobSearchType]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-yixianggangwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedPositions), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedPositions]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-didiandingwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedCity), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedCity]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-nianduxinchou",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.expectSalary), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.expectSalary]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-ruzhiriqi",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.jobStatus), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobStatus]
          ])
        ])
      ]);
    };
  }
});
const ReJobIntention1 = /* @__PURE__ */ _export_sfc(_sfc_main$23, [["__scopeId", "data-v-de44eedc"]]);
const _hoisted_1$1U = { class: "job-intention" };
const _sfc_main$22 = /* @__PURE__ */ defineComponent({
  __name: "JobIntention",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "0fead8b8": _ctx.modelStyle.pTop,
      "33a623e8": _ctx.modelStyle.pBottom,
      "489cdf78": _ctx.modelStyle.pLeftRight,
      "d6191bb6": _ctx.modelStyle.mBottom,
      "0fe97b9b": _ctx.modelStyle.mTop,
      "4ff65fa0": _ctx.modelStyle.textFontSize,
      "40ed4823": _ctx.modelStyle.textColor,
      "1eb63a32": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1U, [
        createVNode(ModelTitle$6, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("ul", null, [
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-gongzuoleixing",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(" " + toDisplayString(_ctx.modelData.jobSearchType), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobSearchType]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-yixianggangwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedPositions), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedPositions]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-didiandingwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedCity), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedCity]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-nianduxinchou",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.expectSalary), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.expectSalary]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-ruzhiriqi",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.jobStatus), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobStatus]
          ])
        ])
      ]);
    };
  }
});
const ReJobIntention2 = /* @__PURE__ */ _export_sfc(_sfc_main$22, [["__scopeId", "data-v-c8ec4949"]]);
const _hoisted_1$1T = { class: "job-intention" };
const _sfc_main$21 = /* @__PURE__ */ defineComponent({
  __name: "JobIntentionCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "462bf70c": _ctx.modelStyle.pTop,
      "33a96e34": _ctx.modelStyle.pBottom,
      "466e9c8c": _ctx.modelStyle.pLeftRight,
      "47789723": _ctx.modelStyle.mBottom,
      "462eb146": _ctx.modelStyle.mTop,
      "3d4cf50f": _ctx.modelStyle.themeColor,
      "01d9abd8": unref(left),
      "108519f2": _ctx.modelStyle.textFontSize,
      "66bd25a1": _ctx.modelStyle.textColor,
      "0a39c429": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1T, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        renderSlot(_ctx.$slots, "left-line", {}, void 0, true),
        createElementVNode("ul", null, [
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-gongzuoleixing",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(" " + toDisplayString(_ctx.modelData.jobSearchType), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobSearchType]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-yixianggangwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedPositions), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedPositions]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-didiandingwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedCity), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedCity]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-nianduxinchou",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.expectSalary), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.expectSalary]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-ruzhiriqi",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.jobStatus), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobStatus]
          ])
        ])
      ]);
    };
  }
});
const JobIntentionComVue = /* @__PURE__ */ _export_sfc(_sfc_main$21, [["__scopeId", "data-v-64cb4d3a"]]);
const _sfc_main$20 = /* @__PURE__ */ defineComponent({
  __name: "JobIntention",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(JobIntentionComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _hoisted_1$1S = { class: "job-intention" };
const _sfc_main$1$ = /* @__PURE__ */ defineComponent({
  __name: "JobIntention",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "064212d8": _ctx.modelStyle.pTop,
      "80762ee8": _ctx.modelStyle.pBottom,
      "39222854": _ctx.modelStyle.pLeftRight,
      "0644cd12": _ctx.modelStyle.mTop,
      "211236c9": _ctx.modelStyle.mBottom,
      "ccb328ae": _ctx.modelStyle.themeColor,
      "b771f404": unref(left),
      "87495be8": _ctx.modelStyle.textFontSize,
      "406d73c7": _ctx.modelStyle.textColor,
      "19625dc3": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1S, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("ul", null, [
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-gongzuoleixing",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(" " + toDisplayString(_ctx.modelData.jobSearchType), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobSearchType]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-yixianggangwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedPositions), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedPositions]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-didiandingwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedCity), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedCity]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-nianduxinchou",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.expectSalary), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.expectSalary]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-ruzhiriqi",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.jobStatus), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobStatus]
          ])
        ])
      ]);
    };
  }
});
const ReJobIntention4 = /* @__PURE__ */ _export_sfc(_sfc_main$1$, [["__scopeId", "data-v-3387ad21"]]);
const _hoisted_1$1R = { class: "job-intention" };
const _sfc_main$1_ = /* @__PURE__ */ defineComponent({
  __name: "JobIntention",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "6d1825b8": _ctx.modelStyle.pTop,
      "4e59b6e8": _ctx.modelStyle.pBottom,
      "e0472710": _ctx.modelStyle.pLeftRight,
      "6d16c89b": _ctx.modelStyle.mTop,
      "a0b1f5b6": _ctx.modelStyle.mBottom,
      "1f3ea066": _ctx.modelStyle.themeColor,
      "7918354c": unref(left),
      "4d951d30": _ctx.modelStyle.textFontSize,
      "7d081b23": _ctx.modelStyle.textColor,
      "4355efe7": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1R, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("ul", null, [
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-gongzuoleixing",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(" " + toDisplayString(_ctx.modelData.jobSearchType), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobSearchType]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-yixianggangwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedPositions), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedPositions]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-didiandingwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedCity), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedCity]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-nianduxinchou",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.expectSalary), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.expectSalary]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-ruzhiriqi",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.jobStatus), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobStatus]
          ])
        ])
      ]);
    };
  }
});
const ReJobIntention5 = /* @__PURE__ */ _export_sfc(_sfc_main$1_, [["__scopeId", "data-v-04f19f67"]]);
const _hoisted_1$1Q = { class: "job-intention-content" };
const _sfc_main$1Z = /* @__PURE__ */ defineComponent({
  __name: "JobIntention1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "62d653fb": _ctx.modelStyle.textFontSize,
      "d82f5f90": _ctx.modelStyle.textColor,
      "0d249ff2": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1Q, [
        createElementVNode("ul", null, [
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-gongzuoleixing",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(" " + toDisplayString(_ctx.modelData.jobSearchType), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobSearchType]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-yixianggangwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedPositions), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedPositions]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-didiandingwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedCity), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedCity]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-nianduxinchou",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.expectSalary), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.expectSalary]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-ruzhiriqi",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.jobStatus), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobStatus]
          ])
        ])
      ]);
    };
  }
});
const JobIntention1 = /* @__PURE__ */ _export_sfc(_sfc_main$1Z, [["__scopeId", "data-v-fd78c512"]]);
const _hoisted_1$1P = { class: "job-intention" };
const _sfc_main$1Y = /* @__PURE__ */ defineComponent({
  __name: "JobIntention",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "db8889fa": _ctx.modelStyle.pTop,
      "363419bd": _ctx.modelStyle.pBottom,
      "e2a0c4fa": _ctx.modelStyle.pLeftRight,
      "db8b4434": _ctx.modelStyle.mTop,
      "d0fd300c": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1P, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(JobIntention1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReJobIntention6 = /* @__PURE__ */ _export_sfc(_sfc_main$1Y, [["__scopeId", "data-v-12433edd"]]);
const _hoisted_1$1O = { class: "job-intention-7" };
const _sfc_main$1X = /* @__PURE__ */ defineComponent({
  __name: "JobIntention",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "4df611b5": _ctx.modelStyle.pTop,
      "4fa2edcb": _ctx.modelStyle.pBottom,
      "36e6a6b5": _ctx.modelStyle.pLeftRight,
      "4df4b498": _ctx.modelStyle.mTop,
      "9e1f87f0": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1O, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(JobIntention1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReJobIntention7 = /* @__PURE__ */ _export_sfc(_sfc_main$1X, [["__scopeId", "data-v-5965fe53"]]);
const _hoisted_1$1N = { class: "job-intention-7" };
const _hoisted_2$16 = { class: "model-border-box" };
const _hoisted_3$Q = { class: "icon-box" };
const _sfc_main$1W = /* @__PURE__ */ defineComponent({
  __name: "JobIntention",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3f39ce36": _ctx.modelStyle.pLeftRight,
      "217e8ac8": _ctx.modelStyle.mTop,
      "b3b71050": _ctx.modelStyle.mBottom,
      "40e75c3a": _ctx.modelStyle.themeColor,
      "44d7299b": _ctx.modelStyle.pBottom,
      "217fe7e5": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1N, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$16, [
          createElementVNode("div", _hoisted_3$Q, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(JobIntention1, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReJobIntention8 = /* @__PURE__ */ _export_sfc(_sfc_main$1W, [["__scopeId", "data-v-743cab68"]]);
const _hoisted_1$1M = { class: "job-intention" };
const _sfc_main$1V = /* @__PURE__ */ defineComponent({
  __name: "JobIntention",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2fd903b2": _ctx.modelStyle.pTop,
      "0efd42a4": _ctx.modelStyle.pBottom,
      "a6cd321c": _ctx.modelStyle.pLeftRight,
      "59ceaceb": _ctx.modelStyle.mBottom,
      "2fd7a695": _ctx.modelStyle.mTop,
      "2efd612a": _ctx.modelStyle.textFontSize,
      "3be4e969": _ctx.modelStyle.textColor,
      "6bbd1d61": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1M, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("ul", null, [
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-gongzuoleixing",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(" " + toDisplayString(_ctx.modelData.jobSearchType), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobSearchType]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-yixianggangwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedPositions), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedPositions]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-didiandingwei",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.intendedCity), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.intendedCity]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-nianduxinchou",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.expectSalary), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.expectSalary]
          ]),
          withDirectives(createElementVNode("li", null, [
            createVNode(_component_svg_icon, {
              "icon-name": "icon-ruzhiriqi",
              "class-name": "icon",
              color: "#757575"
            }),
            createTextVNode(toDisplayString(_ctx.modelData.jobStatus), 1)
          ], 512), [
            [vShow, _ctx.modelData.isShow.jobStatus]
          ])
        ])
      ]);
    };
  }
});
const ReJobIntention9 = /* @__PURE__ */ _export_sfc(_sfc_main$1V, [["__scopeId", "data-v-171c6a88"]]);
const _hoisted_1$1L = { class: "job-intention-10-box" };
const _sfc_main$1U = /* @__PURE__ */ defineComponent({
  __name: "JobIntention",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "02c89122": _ctx.modelStyle.pTop,
      "6904c984": _ctx.modelStyle.pBottom,
      "43a52062": _ctx.modelStyle.pLeftRight,
      "02c73405": _ctx.modelStyle.mTop,
      "2ccae97b": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1L, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(JobIntention1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReJobIntention10 = /* @__PURE__ */ _export_sfc(_sfc_main$1U, [["__scopeId", "data-v-5dad9da7"]]);
const _hoisted_1$1K = { class: "skill-specialties" };
const _hoisted_2$15 = { class: "left" };
const _hoisted_3$P = { key: 0 };
const _hoisted_4$u = { class: "right" };
const _hoisted_5$u = { key: 0 };
const _sfc_main$1T = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "4d912119": _ctx.modelStyle.pTop,
      "6d26f3e7": _ctx.modelStyle.pBottom,
      "04acc9ce": _ctx.modelStyle.pLeftRight,
      "4d8fc3fc": _ctx.modelStyle.mTop,
      "63177bb8": _ctx.modelStyle.mBottom,
      "7cd12791": _ctx.modelStyle.textFontSize,
      "1d7a1462": _ctx.modelStyle.textColor,
      "d88e33f0": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1K, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("ul", null, [
          createElementVNode("div", _hoisted_2$15, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
              return openBlock(), createElementBlock(Fragment, { key: index }, [
                index % 2 === 0 ? withDirectives((openBlock(), createElementBlock("li", _hoisted_3$P, null, 512)), [
                  [_directive_dompurify_html, item.introduce]
                ]) : createCommentVNode("", true)
              ], 64);
            }), 128))
          ]),
          createElementVNode("div", _hoisted_4$u, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
              return openBlock(), createElementBlock(Fragment, { key: index }, [
                index % 2 != 0 ? withDirectives((openBlock(), createElementBlock("li", _hoisted_5$u, null, 512)), [
                  [_directive_dompurify_html, item.introduce]
                ]) : createCommentVNode("", true)
              ], 64);
            }), 128))
          ])
        ])
      ]);
    };
  }
});
const ReSkillSpecialties1 = /* @__PURE__ */ _export_sfc(_sfc_main$1T, [["__scopeId", "data-v-d1e07209"]]);
const _hoisted_1$1J = { class: "skill-specialties" };
const _hoisted_2$14 = { class: "skill-title" };
const _sfc_main$1S = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "b27f147c": _ctx.modelStyle.pTop,
      "0fd81ac4": _ctx.modelStyle.pBottom,
      "21f1e5fc": _ctx.modelStyle.pLeftRight,
      "b281ceb6": _ctx.modelStyle.mTop,
      "596140db": _ctx.modelStyle.mBottom,
      "bdbb7d4e": _ctx.modelStyle.textColor,
      "e6cc798c": _ctx.modelStyle.textFontSize,
      "586d891e": _ctx.modelStyle.textFontWeight
    }));
    const vModelPro = (text) => {
      return textToNumber(text);
    };
    const formatTooltip = (number) => {
      return numberToText(number);
    };
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      const _component_el_slider = resolveComponent("el-slider");
      return openBlock(), createElementBlock("div", _hoisted_1$1J, [
        createElementVNode("div", _hoisted_2$14, [
          createVNode(_component_svg_icon, {
            "icon-name": "icon-techang",
            color: "#fff",
            size: "26px"
          }),
          createElementVNode("h1", null, toDisplayString(_ctx.modelData.title), 1)
        ]),
        createElementVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item) => {
            return openBlock(), createElementBlock("li", {
              key: item.skillName
            }, [
              createElementVNode("p", null, toDisplayString(item.skillName), 1),
              createVNode(_component_el_slider, {
                "model-value": vModelPro(item.proficiency),
                step: 4,
                size: "small",
                "format-tooltip": formatTooltip,
                disabled: ""
              }, null, 8, ["model-value"])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReSkillSpecialties2 = /* @__PURE__ */ _export_sfc(_sfc_main$1S, [["__scopeId", "data-v-3421993f"]]);
const _hoisted_1$1I = { class: "skill-specialties" };
const _hoisted_2$13 = { class: "left" };
const _hoisted_3$O = { key: 0 };
const _hoisted_4$t = { class: "right" };
const _hoisted_5$t = { key: 0 };
const _sfc_main$1R = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialtiesCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "1a093b21": _ctx.modelStyle.pTop,
      "8cf78642": _ctx.modelStyle.pBottom,
      "cd4fe1be": _ctx.modelStyle.pLeftRight,
      "1ad18b1c": _ctx.modelStyle.mBottom,
      "1a07de04": _ctx.modelStyle.mTop,
      "0c475b14": _ctx.modelStyle.themeColor,
      "4f8bd0de": unref(left),
      "329a8cce": _ctx.modelStyle.textFontSize,
      "70ae014c": _ctx.modelStyle.textColor,
      "0b7e1610": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1I, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("ul", null, [
          createElementVNode("div", _hoisted_2$13, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
              return openBlock(), createElementBlock(Fragment, { key: index }, [
                index % 2 === 0 ? withDirectives((openBlock(), createElementBlock("li", _hoisted_3$O, null, 512)), [
                  [_directive_dompurify_html, item.introduce]
                ]) : createCommentVNode("", true)
              ], 64);
            }), 128))
          ]),
          createElementVNode("div", _hoisted_4$t, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
              return openBlock(), createElementBlock(Fragment, { key: index }, [
                index % 2 != 0 ? withDirectives((openBlock(), createElementBlock("li", _hoisted_5$t, null, 512)), [
                  [_directive_dompurify_html, item.introduce]
                ]) : createCommentVNode("", true)
              ], 64);
            }), 128))
          ])
        ])
      ]);
    };
  }
});
const SkillSpecialtiesComVue = /* @__PURE__ */ _export_sfc(_sfc_main$1R, [["__scopeId", "data-v-0fb2138d"]]);
const _sfc_main$1Q = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(SkillSpecialtiesComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _hoisted_1$1H = { class: "skill-specialties" };
const _sfc_main$1P = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "0fc3ca07": _ctx.modelStyle.pTop,
      "727f7c39": _ctx.modelStyle.pBottom,
      "17495987": _ctx.modelStyle.pLeftRight,
      "0fc26cea": _ctx.modelStyle.mTop,
      "58666b14": _ctx.modelStyle.mBottom,
      "77cd9cdc": _ctx.modelStyle.themeColor,
      "9a78472a": unref(left),
      "a509fb02": _ctx.modelStyle.textFontSize,
      "2ed1d034": _ctx.modelStyle.textColor,
      "4157bd76": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1H, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return withDirectives((openBlock(), createElementBlock("li", { key: index })), [
              [_directive_dompurify_html, item.introduce]
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReSkillSpecialties4 = /* @__PURE__ */ _export_sfc(_sfc_main$1P, [["__scopeId", "data-v-73df42b4"]]);
const _hoisted_1$1G = { class: "skill-specialties" };
const _sfc_main$1O = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "54dde621": _ctx.modelStyle.pTop,
      "28289c42": _ctx.modelStyle.pBottom,
      "2ec07a21": _ctx.modelStyle.pLeftRight,
      "54dc8904": _ctx.modelStyle.mTop,
      "4d39001c": _ctx.modelStyle.mBottom,
      "e1768514": _ctx.modelStyle.themeColor,
      "98bb66de": unref(left),
      "78a736ce": _ctx.modelStyle.textFontSize,
      "03f1974c": _ctx.modelStyle.textColor,
      "de8dfde0": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1G, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return withDirectives((openBlock(), createElementBlock("li", { key: index })), [
              [_directive_dompurify_html, item.introduce]
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReSkillSpecialties5 = /* @__PURE__ */ _export_sfc(_sfc_main$1O, [["__scopeId", "data-v-0b0c7d35"]]);
const _hoisted_1$1F = { class: "skill-specialties-content" };
const _sfc_main$1N = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "74e01df5": _ctx.modelStyle.textFontSize,
      "f9fd4f04": _ctx.modelStyle.textColor,
      "78385928": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1F, [
        createElementVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return withDirectives((openBlock(), createElementBlock("li", { key: index })), [
              [_directive_dompurify_html, item.introduce]
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const SkillSpecialties1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$1N, [["__scopeId", "data-v-9e185879"]]);
const _hoisted_1$1E = { class: "skill-specialties" };
const _sfc_main$1M = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "befd76ca": _ctx.modelStyle.pTop,
      "045b0925": _ctx.modelStyle.pBottom,
      "98c4d5ca": _ctx.modelStyle.pLeftRight,
      "bf003104": _ctx.modelStyle.mTop,
      "65a85762": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1E, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SkillSpecialties1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSkillSpecialties6 = /* @__PURE__ */ _export_sfc(_sfc_main$1M, [["__scopeId", "data-v-2512a7bb"]]);
const _hoisted_1$1D = { class: "skill-specialties" };
const _sfc_main$1L = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "0c613622": _ctx.modelStyle.pTop,
      "f4325384": _ctx.modelStyle.pBottom,
      "1f6e0562": _ctx.modelStyle.pLeftRight,
      "0c5fd905": _ctx.modelStyle.mTop,
      "3197b70a": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1D, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SkillSpecialties1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSkillSpecialties7 = /* @__PURE__ */ _export_sfc(_sfc_main$1L, [["__scopeId", "data-v-bf579e45"]]);
const _hoisted_1$1C = { class: "skill-specialties-content" };
const _sfc_main$1K = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties2",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "79264113": _ctx.modelStyle.textColor,
      "f4141d80": _ctx.modelStyle.textFontSize,
      "325c0012": _ctx.modelStyle.textFontWeight,
      "780747dd": _ctx.modelStyle.themeColor
    }));
    const vModelPro = (text) => {
      return textToNumber(text);
    };
    const formatTooltip = (number) => {
      return numberToText(number);
    };
    return (_ctx, _cache) => {
      const _component_el_slider = resolveComponent("el-slider");
      return openBlock(), createElementBlock("div", _hoisted_1$1C, [
        createElementVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item) => {
            return openBlock(), createElementBlock("li", {
              key: item.skillName
            }, [
              createElementVNode("p", null, toDisplayString(item.skillName), 1),
              createVNode(_component_el_slider, {
                "model-value": vModelPro(item.proficiency),
                step: 4,
                size: "small",
                "format-tooltip": formatTooltip,
                disabled: ""
              }, null, 8, ["model-value"])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const SkillSpecialties2Vue = /* @__PURE__ */ _export_sfc(_sfc_main$1K, [["__scopeId", "data-v-e0440376"]]);
const _hoisted_1$1B = { class: "skill-specialties" };
const _sfc_main$1J = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "7dd5883f": _ctx.modelStyle.pTop,
      "55467301": _ctx.modelStyle.pBottom,
      "66f18dbf": _ctx.modelStyle.pLeftRight,
      "7dd42b22": _ctx.modelStyle.mTop,
      "92d87d84": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1B, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SkillSpecialties2Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSkillSpecialties8 = /* @__PURE__ */ _export_sfc(_sfc_main$1J, [["__scopeId", "data-v-e8f492ea"]]);
const _hoisted_1$1A = { class: "skill-specialties" };
const _hoisted_2$12 = { class: "model-border-box" };
const _hoisted_3$N = { class: "icon-box" };
const _sfc_main$1I = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "032228ee": _ctx.modelStyle.pLeftRight,
      "5ef6286c": _ctx.modelStyle.mTop,
      "ae137098": _ctx.modelStyle.mBottom,
      "5ef32ede": _ctx.modelStyle.themeColor,
      "47a8f977": _ctx.modelStyle.pBottom,
      "5ef78589": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1A, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$12, [
          createElementVNode("div", _hoisted_3$N, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(SkillSpecialties1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReSkillSpecialties9 = /* @__PURE__ */ _export_sfc(_sfc_main$1I, [["__scopeId", "data-v-100b2151"]]);
const _hoisted_1$1z = { class: "skill-specialties" };
const _hoisted_2$11 = { class: "model-border-box" };
const _hoisted_3$M = { class: "icon-box" };
const _sfc_main$1H = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3937827d": _ctx.modelStyle.pLeftRight,
      "25e80660": _ctx.modelStyle.mTop,
      "154a3540": _ctx.modelStyle.mBottom,
      "cc88745c": _ctx.modelStyle.themeColor,
      "980631fa": _ctx.modelStyle.pBottom,
      "25e9637d": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1z, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$11, [
          createElementVNode("div", _hoisted_3$M, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(SkillSpecialties2Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReSkillSpecialties10 = /* @__PURE__ */ _export_sfc(_sfc_main$1H, [["__scopeId", "data-v-965262df"]]);
const _hoisted_1$1y = { class: "skill-specialties" };
const _sfc_main$1G = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "75563708": _ctx.modelStyle.pTop,
      "7d3a6398": _ctx.modelStyle.pBottom,
      "79077c70": _ctx.modelStyle.pLeftRight,
      "7554d9eb": _ctx.modelStyle.mTop,
      "42f09c56": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1y, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SkillSpecialties1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSkillSpecialties11 = /* @__PURE__ */ _export_sfc(_sfc_main$1G, [["__scopeId", "data-v-44ee866e"]]);
const _hoisted_1$1x = { class: "skill-specialties" };
const _sfc_main$1F = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2366be20": _ctx.modelStyle.pTop,
      "dad93500": _ctx.modelStyle.pBottom,
      "046116e0": _ctx.modelStyle.pLeftRight,
      "23656103": _ctx.modelStyle.mTop,
      "183e9886": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1x, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SkillSpecialties2Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSkillSpecialties12 = /* @__PURE__ */ _export_sfc(_sfc_main$1F, [["__scopeId", "data-v-92dc1460"]]);
const _hoisted_1$1w = { class: "skill-specialties-content" };
const _hoisted_2$10 = { class: "skill-list-box" };
const _hoisted_3$L = { class: "left" };
const _hoisted_4$s = { key: 0 };
const _hoisted_5$s = { class: "right" };
const _hoisted_6$r = { key: 0 };
const _sfc_main$1E = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties3",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "32876f26": _ctx.modelStyle.textFontSize,
      "3919fced": _ctx.modelStyle.textColor,
      "9608c746": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1w, [
        createElementVNode("div", _hoisted_2$10, [
          createElementVNode("div", _hoisted_3$L, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
              return openBlock(), createElementBlock(Fragment, { key: index }, [
                index % 2 === 0 ? withDirectives((openBlock(), createElementBlock("li", _hoisted_4$s, null, 512)), [
                  [_directive_dompurify_html, item.introduce]
                ]) : createCommentVNode("", true)
              ], 64);
            }), 128))
          ]),
          createElementVNode("div", _hoisted_5$s, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
              return openBlock(), createElementBlock(Fragment, { key: index }, [
                index % 2 != 0 ? withDirectives((openBlock(), createElementBlock("li", _hoisted_6$r, null, 512)), [
                  [_directive_dompurify_html, item.introduce]
                ]) : createCommentVNode("", true)
              ], 64);
            }), 128))
          ])
        ])
      ]);
    };
  }
});
const SkillSpecialties3Vue = /* @__PURE__ */ _export_sfc(_sfc_main$1E, [["__scopeId", "data-v-e4a9c55c"]]);
const _hoisted_1$1v = { class: "skill-specialties" };
const _sfc_main$1D = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "6eca5456": _ctx.modelStyle.pTop,
      "a6cec8ec": _ctx.modelStyle.pBottom,
      "08ccac96": _ctx.modelStyle.pLeftRight,
      "6ec8f739": _ctx.modelStyle.mTop,
      "0de5e9c7": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1v, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SkillSpecialties3Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSkillSpecialties13 = /* @__PURE__ */ _export_sfc(_sfc_main$1D, [["__scopeId", "data-v-9fb7d67b"]]);
const _withScopeId$j = (n) => (pushScopeId("data-v-a9eb901c"), n = n(), popScopeId(), n);
const _hoisted_1$1u = { class: "skill-specialties" };
const _hoisted_2$$ = { class: "skill-specialties-14-content-box" };
const _hoisted_3$K = /* @__PURE__ */ _withScopeId$j(() => /* @__PURE__ */ createElementVNode("div", { class: "left" }, [
  /* @__PURE__ */ createElementVNode("img", {
    src: _imports_0,
    alt: "列表"
  }),
  /* @__PURE__ */ createElementVNode("img", {
    class: "moduleborder",
    src: _imports_1,
    alt: "边框"
  })
], -1));
const _sfc_main$1C = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "458f4cb7": _ctx.modelStyle.pTop,
      "bf8688ee": _ctx.modelStyle.pBottom,
      "5d97cf92": _ctx.modelStyle.pLeftRight,
      "458def9a": _ctx.modelStyle.mTop,
      "018a09c6": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1u, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$$, [
          _hoisted_3$K,
          createVNode(SkillSpecialties3Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReSkillSpecialties14 = /* @__PURE__ */ _export_sfc(_sfc_main$1C, [["__scopeId", "data-v-a9eb901c"]]);
const _hoisted_1$1t = { class: "skill-specialties-content" };
const _sfc_main$1B = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties4",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "7eddc461": _ctx.modelStyle.textColor,
      "66e1f99c": _ctx.modelStyle.textFontSize,
      "2923452e": _ctx.modelStyle.textFontWeight
    }));
    const vModelPro = (text) => {
      return textToNumber(text);
    };
    const formatTooltip = (number) => {
      return numberToText(number);
    };
    return (_ctx, _cache) => {
      const _component_el_slider = resolveComponent("el-slider");
      return openBlock(), createElementBlock("div", _hoisted_1$1t, [
        createElementVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item) => {
            return openBlock(), createElementBlock("li", {
              key: item.skillName
            }, [
              createElementVNode("p", null, toDisplayString(item.skillName), 1),
              createVNode(_component_el_slider, {
                "model-value": vModelPro(item.proficiency),
                step: 4,
                size: "small",
                "format-tooltip": formatTooltip,
                disabled: ""
              }, null, 8, ["model-value"])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const SkillSpecialties4Vue = /* @__PURE__ */ _export_sfc(_sfc_main$1B, [["__scopeId", "data-v-c52f02e8"]]);
const _hoisted_1$1s = { class: "skill-specialties" };
const _sfc_main$1A = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "1b873c6a": _ctx.modelStyle.pTop,
      "22049df5": _ctx.modelStyle.pBottom,
      "e60be36a": _ctx.modelStyle.pLeftRight,
      "1b89f6a4": _ctx.modelStyle.mTop,
      "f95c279c": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1s, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SkillSpecialties4Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSkillSpecialties15 = /* @__PURE__ */ _export_sfc(_sfc_main$1A, [["__scopeId", "data-v-a4ef0e34"]]);
const _hoisted_1$1r = { class: "skill-specialties" };
const _sfc_main$1z = /* @__PURE__ */ defineComponent({
  __name: "SkillSpecialties",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "c47e9a00": _ctx.modelStyle.pTop,
      "862a76c0": _ctx.modelStyle.pBottom,
      "51e7e3c0": _ctx.modelStyle.pLeftRight,
      "c481543a": _ctx.modelStyle.mTop,
      "1e3812dd": _ctx.modelStyle.mBottom
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1r, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SkillSpecialties1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSkillSpecialties16 = /* @__PURE__ */ _export_sfc(_sfc_main$1z, [["__scopeId", "data-v-1950d127"]]);
const _hoisted_1$1q = { class: "campus-experience" };
const _hoisted_2$_ = { class: "campue-experience-list" };
const _hoisted_3$J = { key: 0 };
const _hoisted_4$r = { key: 1 };
const _hoisted_5$r = { key: 2 };
const _hoisted_6$q = { key: 0 };
const _sfc_main$1y = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "cbc5a010": _ctx.modelStyle.pTop,
      "4bdd84a8": _ctx.modelStyle.pBottom,
      "5d00c6b8": _ctx.modelStyle.pLeftRight,
      "a5aa5a36": _ctx.modelStyle.mBottom,
      "cbc85a4a": _ctx.modelStyle.mTop,
      "b5fb08d6": _ctx.modelStyle.titleFontSize,
      "3314dede": _ctx.modelStyle.titleColor,
      "74e5490c": _ctx.modelStyle.titleFontWeight,
      "630be770": _ctx.modelStyle.textFontSize,
      "28cf78e3": _ctx.modelStyle.textColor,
      "5379abb2": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1q, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$_, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$J, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusBriefly ? (openBlock(), createElementBlock("li", _hoisted_4$r, toDisplayString(item.campusBriefly), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusDuty ? (openBlock(), createElementBlock("li", _hoisted_5$r, toDisplayString(item.campusDuty), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.campusContent ? withDirectives((openBlock(), createElementBlock("p", _hoisted_6$q, null, 512)), [
                [_directive_dompurify_html, item.campusContent]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReCampusExperience1 = /* @__PURE__ */ _export_sfc(_sfc_main$1y, [["__scopeId", "data-v-46f16b59"]]);
const _hoisted_1$1p = { class: "campus-experience" };
const _hoisted_2$Z = { class: "date-name-box" };
const _hoisted_3$I = { key: 0 };
const _hoisted_4$q = { key: 1 };
const _hoisted_5$q = {
  key: 0,
  class: "campusDuty"
};
const _hoisted_6$p = {
  key: 1,
  class: "campusContent"
};
const _sfc_main$1x = /* @__PURE__ */ defineComponent({
  __name: "CampusExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "4e2b83fe": _ctx.modelStyle.pTop,
      "c97d2a3c": _ctx.modelStyle.pBottom,
      "17657e3e": _ctx.modelStyle.pLeftRight,
      "06e28dc2": _ctx.modelStyle.mBottom,
      "4e2a26e1": _ctx.modelStyle.mTop,
      "738b4e4f": _ctx.modelStyle.titleFontSize,
      "250cd338": _ctx.modelStyle.titleColor,
      "76f75574": _ctx.modelStyle.titleFontWeight,
      "1720d576": _ctx.modelStyle.textFontSize,
      "2ed2b89d": _ctx.modelStyle.textColor,
      "4e56a2a6": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1p, [
        createVNode(ModelTitle$6, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "list"
          }, [
            createElementVNode("ul", null, [
              createElementVNode("div", _hoisted_2$Z, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_3$I, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusBriefly ? (openBlock(), createElementBlock("span", _hoisted_4$q, toDisplayString(item.campusBriefly), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.campusDuty ? (openBlock(), createElementBlock("p", _hoisted_5$q, toDisplayString(item.campusDuty), 1)) : createCommentVNode("", true),
              _ctx.modelData.isShow.campusContent ? withDirectives((openBlock(), createElementBlock("p", _hoisted_6$p, null, 512)), [
                [_directive_dompurify_html, item.campusContent]
              ]) : createCommentVNode("", true)
            ])
          ]);
        }), 128))
      ]);
    };
  }
});
const ReCampusExperience2 = /* @__PURE__ */ _export_sfc(_sfc_main$1x, [["__scopeId", "data-v-6acc7efd"]]);
const _hoisted_1$1o = { class: "campus-experience" };
const _hoisted_2$Y = { class: "campue-experience-list" };
const _hoisted_3$H = { key: 0 };
const _hoisted_4$p = { key: 1 };
const _hoisted_5$p = { key: 2 };
const _hoisted_6$o = { key: 0 };
const _sfc_main$1w = /* @__PURE__ */ defineComponent({
  __name: "CampusExperienceCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3a88efee": _ctx.modelStyle.pTop,
      "b2558e1c": _ctx.modelStyle.pBottom,
      "5c9e362e": _ctx.modelStyle.pLeftRight,
      "0822872f": _ctx.modelStyle.mBottom,
      "3a8792d1": _ctx.modelStyle.mTop,
      "85bb0cfa": _ctx.modelStyle.themeColor,
      "7fdb60e4": unref(left),
      "521f5f42": _ctx.modelStyle.titleFontSize,
      "32b24e54": _ctx.modelStyle.titleColor,
      "3a9dd954": _ctx.modelStyle.titleFontWeight,
      "1de95d34": _ctx.modelStyle.textFontSize,
      "b6a97aa6": _ctx.modelStyle.textColor,
      "3be022c6": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1o, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("div", _hoisted_2$Y, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$H, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusBriefly ? (openBlock(), createElementBlock("li", _hoisted_4$p, toDisplayString(item.campusBriefly), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusDuty ? (openBlock(), createElementBlock("li", _hoisted_5$p, toDisplayString(item.campusDuty), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.campusContent ? withDirectives((openBlock(), createElementBlock("p", _hoisted_6$o, null, 512)), [
                [_directive_dompurify_html, item.campusContent]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const CampusExperienceComVue = /* @__PURE__ */ _export_sfc(_sfc_main$1w, [["__scopeId", "data-v-b703d6fc"]]);
const _sfc_main$1v = /* @__PURE__ */ defineComponent({
  __name: "CampusExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(CampusExperienceComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _hoisted_1$1n = { class: "campus-experience" };
const _hoisted_2$X = { class: "campue-experience-list" };
const _hoisted_3$G = { key: 0 };
const _hoisted_4$o = { key: 1 };
const _hoisted_5$o = { key: 2 };
const _hoisted_6$n = { key: 0 };
const _sfc_main$1u = /* @__PURE__ */ defineComponent({
  __name: "CampusExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "147cfef6": _ctx.modelStyle.pTop,
      "7b51660a": _ctx.modelStyle.pBottom,
      "fa108cf6": _ctx.modelStyle.pLeftRight,
      "23a49b38": _ctx.modelStyle.mBottom,
      "147fb930": _ctx.modelStyle.mTop,
      "3908064c": _ctx.modelStyle.themeColor,
      "87116ea6": unref(left),
      "bca90cb0": _ctx.modelStyle.titleFontSize,
      "590bd1ab": _ctx.modelStyle.titleColor,
      "2971e342": _ctx.modelStyle.titleFontWeight,
      "31dd4a06": _ctx.modelStyle.textFontSize,
      "300f0f14": _ctx.modelStyle.textColor,
      "6eb9ee74": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1n, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$X, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$G, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusBriefly ? (openBlock(), createElementBlock("li", _hoisted_4$o, toDisplayString(item.campusBriefly), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusDuty ? (openBlock(), createElementBlock("li", _hoisted_5$o, toDisplayString(item.campusDuty), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.campusContent ? withDirectives((openBlock(), createElementBlock("p", _hoisted_6$n, null, 512)), [
                [_directive_dompurify_html, item.campusContent]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReCampusExperience4 = /* @__PURE__ */ _export_sfc(_sfc_main$1u, [["__scopeId", "data-v-530b1001"]]);
const _hoisted_1$1m = { class: "campus-experience" };
const _hoisted_2$W = { class: "campue-experience-list" };
const _hoisted_3$F = { key: 0 };
const _hoisted_4$n = { key: 1 };
const _hoisted_5$n = { key: 2 };
const _hoisted_6$m = { key: 0 };
const _sfc_main$1t = /* @__PURE__ */ defineComponent({
  __name: "CampusExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "5db0b2e1": _ctx.modelStyle.pTop,
      "9226a5c2": _ctx.modelStyle.pBottom,
      "1412923e": _ctx.modelStyle.pLeftRight,
      "1839fb5c": _ctx.modelStyle.mBottom,
      "5daf55c4": _ctx.modelStyle.mTop,
      "567afa36": _ctx.modelStyle.themeColor,
      "cae0105e": unref(left),
      "4dcda268": _ctx.modelStyle.titleFontSize,
      "67ea61f2": _ctx.modelStyle.titleColor,
      "03c7eafa": _ctx.modelStyle.titleFontWeight,
      "d3731d4e": _ctx.modelStyle.textFontSize,
      "0cb65f9a": _ctx.modelStyle.textColor,
      "2502ddd0": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1m, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$W, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$F, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusBriefly ? (openBlock(), createElementBlock("li", _hoisted_4$n, toDisplayString(item.campusBriefly), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusDuty ? (openBlock(), createElementBlock("li", _hoisted_5$n, toDisplayString(item.campusDuty), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.campusContent ? withDirectives((openBlock(), createElementBlock("p", _hoisted_6$m, null, 512)), [
                [_directive_dompurify_html, item.campusContent]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReCampusExperience5 = /* @__PURE__ */ _export_sfc(_sfc_main$1t, [["__scopeId", "data-v-f9fffc26"]]);
const _hoisted_1$1l = { class: "campus-experience-content" };
const _hoisted_2$V = { class: "campue-experience-list" };
const _hoisted_3$E = {
  key: 0,
  class: "start-end-date"
};
const _hoisted_4$m = { key: 1 };
const _hoisted_5$m = { key: 2 };
const _hoisted_6$l = { key: 0 };
const _sfc_main$1s = /* @__PURE__ */ defineComponent({
  __name: "CampusExperience1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "7ccf3aa9": _ctx.modelStyle.titleFontSize,
      "1672984a": _ctx.modelStyle.titleColor,
      "e702d9c0": _ctx.modelStyle.titleFontWeight,
      "343e1448": _ctx.modelStyle.textFontSize,
      "175ee1f7": _ctx.modelStyle.textColor,
      "0fe364da": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1l, [
        createElementVNode("div", _hoisted_2$V, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$E, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusBriefly ? (openBlock(), createElementBlock("li", _hoisted_4$m, toDisplayString(item.campusBriefly), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.campusDuty ? (openBlock(), createElementBlock("li", _hoisted_5$m, toDisplayString(item.campusDuty), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.campusContent ? withDirectives((openBlock(), createElementBlock("p", _hoisted_6$l, null, 512)), [
                [_directive_dompurify_html, item.campusContent]
              ]) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const CampusExperience1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$1s, [["__scopeId", "data-v-64c04824"]]);
const _hoisted_1$1k = { class: "campus-experience" };
const _sfc_main$1r = /* @__PURE__ */ defineComponent({
  __name: "CampusExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "c724f358": _ctx.modelStyle.pTop,
      "e2617e68": _ctx.modelStyle.pBottom,
      "84142fd8": _ctx.modelStyle.pLeftRight,
      "1fc6e1ee": _ctx.modelStyle.mBottom,
      "c727ad92": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1k, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(CampusExperience1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReCampusExperience6 = /* @__PURE__ */ _export_sfc(_sfc_main$1r, [["__scopeId", "data-v-32951414"]]);
const _hoisted_1$1j = { class: "campus-experience" };
const _sfc_main$1q = /* @__PURE__ */ defineComponent({
  __name: "CampusExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "9143108e": _ctx.modelStyle.pTop,
      "88cacd72": _ctx.modelStyle.pBottom,
      "fcf90c8e": _ctx.modelStyle.pLeftRight,
      "1ce7e784": _ctx.modelStyle.mBottom,
      "9145cac8": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1j, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(CampusExperience1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReCampusExperience7 = /* @__PURE__ */ _export_sfc(_sfc_main$1q, [["__scopeId", "data-v-9a05fa0d"]]);
const _hoisted_1$1i = { class: "campus-experience" };
const _hoisted_2$U = { class: "model-border-box" };
const _hoisted_3$D = { class: "icon-box" };
const _sfc_main$1p = /* @__PURE__ */ defineComponent({
  __name: "CampusExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "f4da619e": _ctx.modelStyle.pLeftRight,
      "7917ea14": _ctx.modelStyle.mTop,
      "b18575e8": _ctx.modelStyle.mBottom,
      "33d1daf4": _ctx.modelStyle.themeColor,
      "45eff6cf": _ctx.modelStyle.pBottom,
      "79194731": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$1i, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$U, [
          createElementVNode("div", _hoisted_3$D, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(CampusExperience1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReCampusExperience8 = /* @__PURE__ */ _export_sfc(_sfc_main$1p, [["__scopeId", "data-v-b043591d"]]);
const _hoisted_1$1h = { class: "campus-experience" };
const _sfc_main$1o = /* @__PURE__ */ defineComponent({
  __name: "CampusExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "78b71f4a": _ctx.modelStyle.pTop,
      "b12307d4": _ctx.modelStyle.pBottom,
      "07ea708a": _ctx.modelStyle.pLeftRight,
      "08bbca53": _ctx.modelStyle.mBottom,
      "78b5c22d": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1h, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(CampusExperience1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReCampusExperience9 = /* @__PURE__ */ _export_sfc(_sfc_main$1o, [["__scopeId", "data-v-7aae5bd4"]]);
const _withScopeId$i = (n) => (pushScopeId("data-v-3169ad03"), n = n(), popScopeId(), n);
const _hoisted_1$1g = { class: "campus-experience" };
const _hoisted_2$T = { class: "campus-experience-10-content-box" };
const _hoisted_3$C = /* @__PURE__ */ _withScopeId$i(() => /* @__PURE__ */ createElementVNode("div", { class: "left" }, [
  /* @__PURE__ */ createElementVNode("img", {
    src: _imports_0,
    alt: "列表"
  }),
  /* @__PURE__ */ createElementVNode("img", {
    class: "moduleborder",
    src: _imports_1,
    alt: "边框"
  })
], -1));
const _sfc_main$1n = /* @__PURE__ */ defineComponent({
  __name: "CampusExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "70957a64": _ctx.modelStyle.pTop,
      "1fd57a12": _ctx.modelStyle.pBottom,
      "6138e10e": _ctx.modelStyle.pLeftRight,
      "fdba6f62": _ctx.modelStyle.mBottom,
      "7098349e": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1g, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$T, [
          _hoisted_3$C,
          createVNode(CampusExperience1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReCampusExperience10 = /* @__PURE__ */ _export_sfc(_sfc_main$1n, [["__scopeId", "data-v-3169ad03"]]);
const _withScopeId$h = (n) => (pushScopeId("data-v-37ee9732"), n = n(), popScopeId(), n);
const _hoisted_1$1f = { class: "internship-experience" };
const _hoisted_2$S = { class: "internship-experience-list" };
const _hoisted_3$B = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$l = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$l = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$k = { class: "job-content" };
const _hoisted_7$j = /* @__PURE__ */ _withScopeId$h(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "实习内容", -1));
const _hoisted_8$e = { class: "content-list" };
const _sfc_main$1m = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "6ee54414": _ctx.modelStyle.pTop,
      "298ca9e8": _ctx.modelStyle.pBottom,
      "419855d4": _ctx.modelStyle.pLeftRight,
      "4c86f949": _ctx.modelStyle.mBottom,
      "6ee3e6f7": _ctx.modelStyle.mTop,
      "261946f9": _ctx.modelStyle.titleFontSize,
      "17ac6dfa": _ctx.modelStyle.titleColor,
      "0b76cb70": _ctx.modelStyle.titleFontWeight,
      "7ffc1f8c": _ctx.modelStyle.textFontSize,
      "61bb9647": _ctx.modelStyle.textColor,
      "7805cb43": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1f, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$S, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$B, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$l, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$l, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$k, [
                _hoisted_7$j,
                createElementVNode("div", _hoisted_8$e, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReInternshipExperience1 = /* @__PURE__ */ _export_sfc(_sfc_main$1m, [["__scopeId", "data-v-37ee9732"]]);
const _hoisted_1$1e = { class: "internship-experience" };
const _hoisted_2$R = { class: "list-ul" };
const _hoisted_3$A = { class: "date-name-box" };
const _hoisted_4$k = { key: 0 };
const _hoisted_5$k = { key: 1 };
const _hoisted_6$j = {
  key: 0,
  class: "campusDuty"
};
const _hoisted_7$i = { class: "campusContent" };
const _sfc_main$1l = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "012f6f87": _ctx.modelStyle.pTop,
      "5f20328e": _ctx.modelStyle.pBottom,
      "387a41f2": _ctx.modelStyle.pLeftRight,
      "31bd34f6": _ctx.modelStyle.mBottom,
      "012e126a": _ctx.modelStyle.mTop,
      "cbe56634": _ctx.modelStyle.titleFontSize,
      "8c5211a6": _ctx.modelStyle.titleColor,
      "52810a1d": _ctx.modelStyle.titleFontWeight,
      "41a927ff": _ctx.modelStyle.textFontSize,
      "5b5cca98": _ctx.modelStyle.textColor,
      "fadafa14": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1e, [
        createVNode(ModelTitle$6, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "list"
          }, [
            createElementVNode("ul", _hoisted_2$R, [
              createElementVNode("div", _hoisted_3$A, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4$k, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("span", _hoisted_5$k, toDisplayString(item.companyName), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("p", _hoisted_6$j, toDisplayString(item.posts), 1)) : createCommentVNode("", true),
              createElementVNode("ul", _hoisted_7$i, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                  return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                    [_directive_dompurify_html, list.content]
                  ]);
                }), 128))
              ])
            ])
          ]);
        }), 128))
      ]);
    };
  }
});
const ReInternshipExperience2 = /* @__PURE__ */ _export_sfc(_sfc_main$1l, [["__scopeId", "data-v-5bb4d201"]]);
const _withScopeId$g = (n) => (pushScopeId("data-v-d75bf9e0"), n = n(), popScopeId(), n);
const _hoisted_1$1d = { class: "internship-experience" };
const _hoisted_2$Q = { class: "internship-experience-list" };
const _hoisted_3$z = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$j = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$j = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$i = { class: "job-content" };
const _hoisted_7$h = /* @__PURE__ */ _withScopeId$g(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "实习内容", -1));
const _hoisted_8$d = { class: "content-list" };
const _sfc_main$1k = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperienceCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3cf0a1d7": _ctx.modelStyle.pTop,
      "f0245b2e": _ctx.modelStyle.pBottom,
      "0a491557": _ctx.modelStyle.pLeftRight,
      "2d89beb4": _ctx.modelStyle.mBottom,
      "3cef44ba": _ctx.modelStyle.mTop,
      "6acd58ac": _ctx.modelStyle.themeColor,
      "11a072ca": unref(left),
      "931096d4": _ctx.modelStyle.titleFontSize,
      "3f45a506": _ctx.modelStyle.titleColor,
      "041f7466": _ctx.modelStyle.titleFontWeight,
      "4109eb62": _ctx.modelStyle.textFontSize,
      "bbf94b38": _ctx.modelStyle.textColor,
      "1915dd74": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1d, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("div", _hoisted_2$Q, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$z, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$j, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$j, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$i, [
                _hoisted_7$h,
                createElementVNode("div", _hoisted_8$d, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const InternshipExperienceComVue = /* @__PURE__ */ _export_sfc(_sfc_main$1k, [["__scopeId", "data-v-d75bf9e0"]]);
const _sfc_main$1j = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(InternshipExperienceComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _withScopeId$f = (n) => (pushScopeId("data-v-d508ed95"), n = n(), popScopeId(), n);
const _hoisted_1$1c = { class: "internship-experience" };
const _hoisted_2$P = { class: "internship-experience-list" };
const _hoisted_3$y = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$i = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$i = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$h = { class: "job-content" };
const _hoisted_7$g = /* @__PURE__ */ _withScopeId$f(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "实习内容", -1));
const _hoisted_8$c = { class: "content-list" };
const _sfc_main$1i = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "9c4e07be": _ctx.modelStyle.pTop,
      "3310dbdf": _ctx.modelStyle.pBottom,
      "6c931021": _ctx.modelStyle.pLeftRight,
      "d743abc8": _ctx.modelStyle.mBottom,
      "9c50c1f8": _ctx.modelStyle.mTop,
      "65d15914": _ctx.modelStyle.themeColor,
      "368e12de": unref(left),
      "94e164e8": _ctx.modelStyle.titleFontSize,
      "42a72847": _ctx.modelStyle.titleColor,
      "d4f50d7a": _ctx.modelStyle.titleFontWeight,
      "519d0ace": _ctx.modelStyle.textFontSize,
      "1089de5a": _ctx.modelStyle.textColor,
      "515ed1e0": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1c, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$P, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$y, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$i, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$i, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$h, [
                _hoisted_7$g,
                createElementVNode("div", _hoisted_8$c, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReInternshipExperience4 = /* @__PURE__ */ _export_sfc(_sfc_main$1i, [["__scopeId", "data-v-d508ed95"]]);
const _withScopeId$e = (n) => (pushScopeId("data-v-fd074448"), n = n(), popScopeId(), n);
const _hoisted_1$1b = { class: "internship-experience" };
const _hoisted_2$O = { class: "internship-experience-list" };
const _hoisted_3$x = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$h = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$h = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$g = { class: "job-content" };
const _hoisted_7$f = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "实习内容", -1));
const _hoisted_8$b = { class: "content-list" };
const _sfc_main$1h = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2cd67968": _ctx.modelStyle.pTop,
      "10017e58": _ctx.modelStyle.pBottom,
      "f26ce9e8": _ctx.modelStyle.pLeftRight,
      "594c8f11": _ctx.modelStyle.mBottom,
      "2cd933a2": _ctx.modelStyle.mTop,
      "3164633e": _ctx.modelStyle.themeColor,
      "3f9c0774": unref(left),
      "1f7966c1": _ctx.modelStyle.titleFontSize,
      "5cdda332": _ctx.modelStyle.titleColor,
      "2d4e1938": _ctx.modelStyle.titleFontWeight,
      "3db4e6c4": _ctx.modelStyle.textFontSize,
      "5372da0f": _ctx.modelStyle.textColor,
      "aaacb70a": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1b, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$O, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$x, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$h, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$h, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$g, [
                _hoisted_7$f,
                createElementVNode("div", _hoisted_8$b, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReInternshipExperience5 = /* @__PURE__ */ _export_sfc(_sfc_main$1h, [["__scopeId", "data-v-fd074448"]]);
const _withScopeId$d = (n) => (pushScopeId("data-v-86dd1246"), n = n(), popScopeId(), n);
const _hoisted_1$1a = { class: "internship-experience-content" };
const _hoisted_2$N = { class: "internship-experience-list" };
const _hoisted_3$w = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$g = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$g = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$f = { class: "job-content" };
const _hoisted_7$e = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "实习内容", -1));
const _hoisted_8$a = { class: "content-list" };
const _sfc_main$1g = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "04bbb34e": _ctx.modelStyle.titleFontSize,
      "10feca9a": _ctx.modelStyle.titleColor,
      "244552d0": _ctx.modelStyle.titleFontWeight,
      "6e29d42c": _ctx.modelStyle.textFontSize,
      "8749b4b2": _ctx.modelStyle.textColor,
      "dcce503a": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$1a, [
        createElementVNode("div", _hoisted_2$N, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$w, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$g, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$g, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$f, [
                _hoisted_7$e,
                createElementVNode("div", _hoisted_8$a, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const InternshipExperience1Vue$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1g, [["__scopeId", "data-v-86dd1246"]]);
const _hoisted_1$19 = { class: "internship-experience" };
const _sfc_main$1f = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2b750231": _ctx.modelStyle.pTop,
      "06b65bcf": _ctx.modelStyle.pBottom,
      "16136b9e": _ctx.modelStyle.pLeftRight,
      "6803aa0c": _ctx.modelStyle.mBottom,
      "2b73a514": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$19, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(InternshipExperience1Vue$1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReInternshipExperience6 = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["__scopeId", "data-v-3cad9fbf"]]);
const _hoisted_1$18 = { class: "internship-experience-content" };
const _hoisted_2$M = { class: "internship-experience-list" };
const _hoisted_3$v = {
  key: 0,
  class: "list-title start-end-date"
};
const _hoisted_4$f = { class: "job-content" };
const _hoisted_5$f = { class: "content-list" };
const _sfc_main$1e = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience2",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "58b7eacb": _ctx.modelStyle.titleFontSize,
      "638aa930": _ctx.modelStyle.titleColor,
      "10fbc2c2": _ctx.modelStyle.titleFontWeight,
      "681e8d0c": _ctx.modelStyle.textFontSize,
      "4ed8f319": _ctx.modelStyle.textColor,
      "cd88bc9e": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$18, [
        createElementVNode("div", _hoisted_2$M, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$v, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                withDirectives(createElementVNode("li", { class: "list-title" }, toDisplayString(item.companyName), 513), [
                  [vShow, _ctx.modelData.isShow.companyName]
                ]),
                withDirectives(createElementVNode("li", { class: "list-title" }, toDisplayString(item.posts), 513), [
                  [vShow, _ctx.modelData.isShow.posts]
                ])
              ]),
              createElementVNode("div", _hoisted_4$f, [
                createElementVNode("div", _hoisted_5$f, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const InternshipExperience1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["__scopeId", "data-v-77e09aff"]]);
const _hoisted_1$17 = { class: "internship-experience" };
const _sfc_main$1d = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "5ed73242": _ctx.modelStyle.pTop,
      "f208df3e": _ctx.modelStyle.pBottom,
      "2b121742": _ctx.modelStyle.pLeftRight,
      "2f6e42c4": _ctx.modelStyle.mBottom,
      "5ed9ec7c": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$17, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(InternshipExperience1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReInternshipExperience7 = /* @__PURE__ */ _export_sfc(_sfc_main$1d, [["__scopeId", "data-v-f1be706e"]]);
const _hoisted_1$16 = { class: "internship-experience" };
const _hoisted_2$L = { class: "model-border-box" };
const _hoisted_3$u = { class: "icon-box" };
const _sfc_main$1c = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "0a9fee9b": _ctx.modelStyle.pLeftRight,
      "ceb93e04": _ctx.modelStyle.mTop,
      "e43f243c": _ctx.modelStyle.mBottom,
      "6b2431f0": _ctx.modelStyle.themeColor,
      "2c931fa5": _ctx.modelStyle.pBottom,
      "ceb683ca": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$16, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$L, [
          createElementVNode("div", _hoisted_3$u, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(InternshipExperience1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReInternshipExperience8 = /* @__PURE__ */ _export_sfc(_sfc_main$1c, [["__scopeId", "data-v-ae3c1865"]]);
const _hoisted_1$15 = { class: "internship-experience" };
const _sfc_main$1b = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "5dd08879": _ctx.modelStyle.pTop,
      "2f85d087": _ctx.modelStyle.pBottom,
      "1ad5fa79": _ctx.modelStyle.pLeftRight,
      "de59c278": _ctx.modelStyle.mBottom,
      "5dcf2b5c": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$15, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(InternshipExperience1Vue$1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReInternshipExperience9 = /* @__PURE__ */ _export_sfc(_sfc_main$1b, [["__scopeId", "data-v-0fa86c35"]]);
const _withScopeId$c = (n) => (pushScopeId("data-v-c9ce4f76"), n = n(), popScopeId(), n);
const _hoisted_1$14 = { class: "internship-experience" };
const _hoisted_2$K = { class: "internship-experience-10-content-box" };
const _hoisted_3$t = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("div", { class: "left" }, [
  /* @__PURE__ */ createElementVNode("img", {
    src: _imports_0,
    alt: "列表"
  }),
  /* @__PURE__ */ createElementVNode("img", {
    class: "moduleborder",
    src: _imports_1,
    alt: "边框"
  })
], -1));
const _sfc_main$1a = /* @__PURE__ */ defineComponent({
  __name: "InternshipExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "276f14ec": _ctx.modelStyle.pTop,
      "4dffe998": _ctx.modelStyle.pBottom,
      "61c824ac": _ctx.modelStyle.pLeftRight,
      "3a4d5971": _ctx.modelStyle.mBottom,
      "276db7cf": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$14, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$K, [
          _hoisted_3$t,
          createVNode(InternshipExperience1Vue$1, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReInternshipExperience10 = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["__scopeId", "data-v-c9ce4f76"]]);
const _withScopeId$b = (n) => (pushScopeId("data-v-a81117f1"), n = n(), popScopeId(), n);
const _hoisted_1$13 = { class: "work-experience" };
const _hoisted_2$J = { class: "work-experience-list" };
const _hoisted_3$s = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$e = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$e = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$e = { class: "job-content" };
const _hoisted_7$d = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "工作内容", -1));
const _hoisted_8$9 = { class: "content-list" };
const _sfc_main$19 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "71556d2d": _ctx.modelStyle.pTop,
      "b50f815a": _ctx.modelStyle.pBottom,
      "8bfcefa6": _ctx.modelStyle.pLeftRight,
      "06c58d90": _ctx.modelStyle.mBottom,
      "71541010": _ctx.modelStyle.mTop,
      "7ff34a00": _ctx.modelStyle.titleFontSize,
      "dfd4bf5a": _ctx.modelStyle.titleColor,
      "56dc28b7": _ctx.modelStyle.titleFontWeight,
      "fa3bc0b6": _ctx.modelStyle.textFontSize,
      "f2b39664": _ctx.modelStyle.textColor,
      "596c291c": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$13, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$J, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$s, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$e, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$e, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$e, [
                _hoisted_7$d,
                createElementVNode("div", _hoisted_8$9, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReWorkExperience1 = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["__scopeId", "data-v-a81117f1"]]);
const _hoisted_1$12 = { class: "work-experience" };
const _hoisted_2$I = { class: "list-ul" };
const _hoisted_3$r = { class: "date-name-box" };
const _hoisted_4$d = { key: 0 };
const _hoisted_5$d = { key: 1 };
const _hoisted_6$d = {
  key: 0,
  class: "campusDuty"
};
const _hoisted_7$c = { class: "campusContent" };
const _sfc_main$18 = /* @__PURE__ */ defineComponent({
  __name: "WorkExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "a3064e66": _ctx.modelStyle.pTop,
      "33ddafb3": _ctx.modelStyle.pBottom,
      "eedc8866": _ctx.modelStyle.pLeftRight,
      "d5aa0420": _ctx.modelStyle.mBottom,
      "a30908a0": _ctx.modelStyle.mTop,
      "7edaf260": _ctx.modelStyle.titleFontSize,
      "5ea5d3f3": _ctx.modelStyle.titleColor,
      "3a7b3917": _ctx.modelStyle.titleFontWeight,
      "23982976": _ctx.modelStyle.textFontSize,
      "11710d2e": _ctx.modelStyle.textColor,
      "37798cbc": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$12, [
        createVNode(ModelTitle$6, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "list"
          }, [
            createElementVNode("ul", _hoisted_2$I, [
              createElementVNode("div", _hoisted_3$r, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4$d, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("span", _hoisted_5$d, toDisplayString(item.companyName), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("p", _hoisted_6$d, toDisplayString(item.posts), 1)) : createCommentVNode("", true),
              createElementVNode("ul", _hoisted_7$c, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                  return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                    [_directive_dompurify_html, list.content]
                  ]);
                }), 128))
              ])
            ])
          ]);
        }), 128))
      ]);
    };
  }
});
const ReWorkExperience2 = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["__scopeId", "data-v-8631a393"]]);
const _withScopeId$a = (n) => (pushScopeId("data-v-9d82305d"), n = n(), popScopeId(), n);
const _hoisted_1$11 = { class: "work-experience" };
const _hoisted_2$H = { class: "work-experience-list" };
const _hoisted_3$q = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$c = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$c = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$c = { class: "job-content" };
const _hoisted_7$b = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "工作内容", -1));
const _hoisted_8$8 = { class: "content-list" };
const _sfc_main$17 = /* @__PURE__ */ defineComponent({
  __name: "WorkExperienceCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "197535b8": _ctx.modelStyle.pTop,
      "cc3da008": _ctx.modelStyle.pBottom,
      "0c012a38": _ctx.modelStyle.pLeftRight,
      "09a3038e": _ctx.modelStyle.mBottom,
      "1977eff2": _ctx.modelStyle.mTop,
      "5a83ae39": _ctx.modelStyle.themeColor,
      "0b94116e": unref(left),
      "49e557e9": _ctx.modelStyle.titleFontSize,
      "5fd8f9ec": _ctx.modelStyle.titleColor,
      "6c826060": _ctx.modelStyle.titleFontWeight,
      "8a1b9ec8": _ctx.modelStyle.textFontSize,
      "04959f37": _ctx.modelStyle.textColor,
      "64884f5a": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$11, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("div", _hoisted_2$H, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$q, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$c, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$c, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$c, [
                _hoisted_7$b,
                createElementVNode("div", _hoisted_8$8, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const WorkExperienceComVue = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["__scopeId", "data-v-9d82305d"]]);
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
  __name: "WorkExperienceCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(WorkExperienceComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _withScopeId$9 = (n) => (pushScopeId("data-v-cd2cd2e2"), n = n(), popScopeId(), n);
const _hoisted_1$10 = { class: "work-experience" };
const _hoisted_2$G = { class: "work-experience-list" };
const _hoisted_3$p = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$b = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$b = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$b = { class: "job-content" };
const _hoisted_7$a = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "工作内容", -1));
const _hoisted_8$7 = { class: "content-list" };
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  __name: "WorkExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "21e995c8": _ctx.modelStyle.pTop,
      "4ed98cd8": _ctx.modelStyle.pBottom,
      "a784def0": _ctx.modelStyle.pLeftRight,
      "9fb249d6": _ctx.modelStyle.mBottom,
      "21e838ab": _ctx.modelStyle.mTop,
      "0cc1d3dd": _ctx.modelStyle.themeColor,
      "ddb0416c": unref(left),
      "cff8c076": _ctx.modelStyle.titleFontSize,
      "fb5caea4": _ctx.modelStyle.titleColor,
      "a7a3bd88": _ctx.modelStyle.titleFontWeight,
      "53850580": _ctx.modelStyle.textFontSize,
      "5cea3513": _ctx.modelStyle.textColor,
      "43668bf7": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$10, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$G, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$p, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$b, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$b, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$b, [
                _hoisted_7$a,
                createElementVNode("div", _hoisted_8$7, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReWorkExperience4 = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["__scopeId", "data-v-cd2cd2e2"]]);
const _withScopeId$8 = (n) => (pushScopeId("data-v-a783a9be"), n = n(), popScopeId(), n);
const _hoisted_1$$ = { class: "work-experience" };
const _hoisted_2$F = { class: "work-experience-list" };
const _hoisted_3$o = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$a = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$a = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$a = { class: "job-content" };
const _hoisted_7$9 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "工作内容", -1));
const _hoisted_8$6 = { class: "content-list" };
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  __name: "WorkExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "8b5c70ee": _ctx.modelStyle.pTop,
      "140f7777": _ctx.modelStyle.pBottom,
      "498fad89": _ctx.modelStyle.pLeftRight,
      "755cc5b4": _ctx.modelStyle.mBottom,
      "8b5f2b28": _ctx.modelStyle.mTop,
      "abd81e44": _ctx.modelStyle.themeColor,
      "7acd3c29": unref(left),
      "2ea0d724": _ctx.modelStyle.titleFontSize,
      "1fa3c5af": _ctx.modelStyle.titleColor,
      "105afcdb": _ctx.modelStyle.titleFontWeight,
      "677c5e01": _ctx.modelStyle.textFontSize,
      "a760181c": _ctx.modelStyle.textColor,
      "ff1f7f10": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$$, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$F, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$o, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$a, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$a, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$a, [
                _hoisted_7$9,
                createElementVNode("div", _hoisted_8$6, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReWorkExperience5 = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__scopeId", "data-v-a783a9be"]]);
const _withScopeId$7 = (n) => (pushScopeId("data-v-b59c43e3"), n = n(), popScopeId(), n);
const _hoisted_1$_ = { class: "work-experience-content" };
const _hoisted_2$E = { class: "work-experience-list" };
const _hoisted_3$n = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$9 = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$9 = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$9 = { class: "job-content" };
const _hoisted_7$8 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "工作内容", -1));
const _hoisted_8$5 = { class: "content-list" };
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  __name: "WorkExperience1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "57c16d7c": _ctx.modelStyle.titleFontSize,
      "6d51b851": _ctx.modelStyle.titleColor,
      "50055f79": _ctx.modelStyle.titleFontWeight,
      "01783023": _ctx.modelStyle.textFontSize,
      "09a82510": _ctx.modelStyle.textColor,
      "ea7fdbcc": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$_, [
        createElementVNode("div", _hoisted_2$E, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$n, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$9, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$9, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$9, [
                _hoisted_7$8,
                createElementVNode("div", _hoisted_8$5, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const WorkExperience1Vue$1 = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["__scopeId", "data-v-b59c43e3"]]);
const _hoisted_1$Z = { class: "work-experience" };
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  __name: "WorkExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "5fefd58e": _ctx.modelStyle.pTop,
      "842be872": _ctx.modelStyle.pBottom,
      "5ce0f739": _ctx.modelStyle.pLeftRight,
      "1f375a04": _ctx.modelStyle.mBottom,
      "5ff28fc8": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$Z, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(WorkExperience1Vue$1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReWorkExperience6 = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-0b2f11c9"]]);
const _hoisted_1$Y = { class: "work-experience-content" };
const _hoisted_2$D = { class: "work-experience-list" };
const _hoisted_3$m = {
  key: 0,
  class: "list-title start-end-date"
};
const _hoisted_4$8 = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$8 = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$8 = { class: "job-content" };
const _hoisted_7$7 = { class: "content-list" };
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  __name: "WorkExperience2",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "13c4ccf8": _ctx.modelStyle.titleFontSize,
      "11451f4f": _ctx.modelStyle.titleColor,
      "289eb18a": _ctx.modelStyle.titleFontWeight,
      "762dcfa1": _ctx.modelStyle.textFontSize,
      "7a4ce652": _ctx.modelStyle.textColor,
      "aee86bd0": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$Y, [
        createElementVNode("div", _hoisted_2$D, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$m, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.companyName ? (openBlock(), createElementBlock("li", _hoisted_4$8, toDisplayString(item.companyName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$8, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$8, [
                createElementVNode("div", _hoisted_7$7, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.jobContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const WorkExperience1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["__scopeId", "data-v-b65ad396"]]);
const _hoisted_1$X = { class: "work-experience" };
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  __name: "WorkExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "84133772": _ctx.modelStyle.pTop,
      "052bb9f9": _ctx.modelStyle.pBottom,
      "dda17872": _ctx.modelStyle.pLeftRight,
      "66790836": _ctx.modelStyle.mBottom,
      "8415f1ac": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$X, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(WorkExperience1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReWorkExperience7 = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["__scopeId", "data-v-60431d35"]]);
const _hoisted_1$W = { class: "work-experience" };
const _hoisted_2$C = { class: "model-border-box" };
const _hoisted_3$l = { class: "icon-box" };
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "WorkExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "e50b909a": _ctx.modelStyle.pLeftRight,
      "8a5f47d4": _ctx.modelStyle.mTop,
      "c34f086c": _ctx.modelStyle.mBottom,
      "240309f0": _ctx.modelStyle.themeColor,
      "3d0b2d8d": _ctx.modelStyle.pBottom,
      "8a5c8d9a": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$W, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$C, [
          createElementVNode("div", _hoisted_3$l, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(WorkExperience1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReWorkExperience8 = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-3bcd40b8"]]);
const _hoisted_1$V = { class: "work-experience" };
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  __name: "WorkExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2e75c659": _ctx.modelStyle.pTop,
      "7ce146a7": _ctx.modelStyle.pBottom,
      "414d5059": _ctx.modelStyle.pLeftRight,
      "43a2d638": _ctx.modelStyle.mBottom,
      "2e74693c": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$V, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(WorkExperience1Vue$1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReWorkExperience9 = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-9f6e4598"]]);
const _withScopeId$6 = (n) => (pushScopeId("data-v-d0461a0c"), n = n(), popScopeId(), n);
const _hoisted_1$U = { class: "work-experience" };
const _hoisted_2$B = { class: "work-experience-10-content-box" };
const _hoisted_3$k = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("div", { class: "left" }, [
  /* @__PURE__ */ createElementVNode("img", {
    src: _imports_0,
    alt: "列表"
  }),
  /* @__PURE__ */ createElementVNode("img", {
    class: "moduleborder",
    src: _imports_1,
    alt: "边框"
  })
], -1));
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  __name: "WorkExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "12480ec4": _ctx.modelStyle.pTop,
      "50baa25c": _ctx.modelStyle.pBottom,
      "5c845c84": _ctx.modelStyle.pLeftRight,
      "9bf01ece": _ctx.modelStyle.mBottom,
      "1246b1a7": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$U, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$B, [
          _hoisted_3$k,
          createVNode(WorkExperience1Vue$1, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReWorkExperience10 = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-d0461a0c"]]);
const _withScopeId$5 = (n) => (pushScopeId("data-v-481b7d45"), n = n(), popScopeId(), n);
const _hoisted_1$T = { class: "project-experience" };
const _hoisted_2$A = { class: "project-experience-list" };
const _hoisted_3$j = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$7 = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$7 = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$7 = { class: "job-content" };
const _hoisted_7$6 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "项目内容", -1));
const _hoisted_8$4 = { class: "content-list" };
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3d56ab9c": _ctx.modelStyle.pTop,
      "4653afa4": _ctx.modelStyle.pBottom,
      "5943a51c": _ctx.modelStyle.pLeftRight,
      "3e23766b": _ctx.modelStyle.mBottom,
      "3d5965d6": _ctx.modelStyle.mTop,
      "37903aca": _ctx.modelStyle.titleFontSize,
      "ad1b74d0": _ctx.modelStyle.titleColor,
      "8745f2dc": _ctx.modelStyle.titleFontWeight,
      "90aaf0ac": _ctx.modelStyle.textFontSize,
      "5e2d52e9": _ctx.modelStyle.textColor,
      "7dbaa3e1": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$T, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$A, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$j, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.projectName ? (openBlock(), createElementBlock("li", _hoisted_4$7, toDisplayString(item.projectName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$7, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$7, [
                _hoisted_7$6,
                createElementVNode("div", _hoisted_8$4, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.projectContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReProjectExperience1 = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-481b7d45"]]);
const _hoisted_1$S = { class: "project-experience" };
const _hoisted_2$z = { class: "list-ul" };
const _hoisted_3$i = { class: "date-name-box" };
const _hoisted_4$6 = { key: 0 };
const _hoisted_5$6 = { key: 1 };
const _hoisted_6$6 = {
  key: 0,
  class: "campusDuty"
};
const _hoisted_7$5 = { class: "campusContent" };
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "1208e7c4": _ctx.modelStyle.pTop,
      "f7ba227c": _ctx.modelStyle.pBottom,
      "9a522344": _ctx.modelStyle.pLeftRight,
      "351f8602": _ctx.modelStyle.mBottom,
      "120ba1fe": _ctx.modelStyle.mTop,
      "ed1b2ba2": _ctx.modelStyle.titleFontSize,
      "ee29f2f8": _ctx.modelStyle.titleColor,
      "05d80db4": _ctx.modelStyle.titleFontWeight,
      "c81284d4": _ctx.modelStyle.textFontSize,
      "6562c47d": _ctx.modelStyle.textColor,
      "7fd10ecd": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$S, [
        createVNode(ModelTitle$6, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "list"
          }, [
            createElementVNode("ul", _hoisted_2$z, [
              createElementVNode("div", _hoisted_3$i, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4$6, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.projectName ? (openBlock(), createElementBlock("span", _hoisted_5$6, toDisplayString(item.projectName), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("p", _hoisted_6$6, toDisplayString(item.posts), 1)) : createCommentVNode("", true),
              createElementVNode("ul", _hoisted_7$5, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item.projectContent, (list, j) => {
                  return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                    [_directive_dompurify_html, list.content]
                  ]);
                }), 128))
              ])
            ])
          ]);
        }), 128))
      ]);
    };
  }
});
const ReProjectExperience2 = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-b849e22a"]]);
const _withScopeId$4 = (n) => (pushScopeId("data-v-6361f558"), n = n(), popScopeId(), n);
const _hoisted_1$R = { class: "project-experience" };
const _hoisted_2$y = { class: "project-experience-list" };
const _hoisted_3$h = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$5 = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$5 = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$5 = { class: "job-content" };
const _hoisted_7$4 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "项目内容", -1));
const _hoisted_8$3 = { class: "content-list" };
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperienceCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "5efce14b": _ctx.modelStyle.pTop,
      "918c2316": _ctx.modelStyle.pBottom,
      "143cedcb": _ctx.modelStyle.pLeftRight,
      "18873cb2": _ctx.modelStyle.mBottom,
      "5efb842e": _ctx.modelStyle.mTop,
      "74c13120": _ctx.modelStyle.themeColor,
      "a05eb0b2": unref(left),
      "33ecd0bc": _ctx.modelStyle.titleFontSize,
      "2b5df41e": _ctx.modelStyle.titleColor,
      "ded4d44e": _ctx.modelStyle.titleFontWeight,
      "3bda95c3": _ctx.modelStyle.textFontSize,
      "2eb8a370": _ctx.modelStyle.textColor,
      "93c0e08c": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$R, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("div", _hoisted_2$y, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$h, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.projectName ? (openBlock(), createElementBlock("li", _hoisted_4$5, toDisplayString(item.projectName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$5, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$5, [
                _hoisted_7$4,
                createElementVNode("div", _hoisted_8$3, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.projectContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ProjectExperienceComVue = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-6361f558"]]);
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(ProjectExperienceComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _withScopeId$3 = (n) => (pushScopeId("data-v-9d6f95d0"), n = n(), popScopeId(), n);
const _hoisted_1$Q = { class: "project-experience" };
const _hoisted_2$x = { class: "project-experience-list" };
const _hoisted_3$g = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$4 = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$4 = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$4 = { class: "job-content" };
const _hoisted_7$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "项目内容", -1));
const _hoisted_8$2 = { class: "content-list" };
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "e54d291c": _ctx.modelStyle.pTop,
      "4baa4224": _ctx.modelStyle.pBottom,
      "389cfeb2": _ctx.modelStyle.pLeftRight,
      "3b782d2b": _ctx.modelStyle.mBottom,
      "e54fe356": _ctx.modelStyle.mTop,
      "cdbd7bf2": _ctx.modelStyle.themeColor,
      "0604efe0": unref(left),
      "254eed4a": _ctx.modelStyle.titleFontSize,
      "0eb116d8": _ctx.modelStyle.titleColor,
      "0022055c": _ctx.modelStyle.titleFontWeight,
      "6f0bee2c": _ctx.modelStyle.textFontSize,
      "592f59a9": _ctx.modelStyle.textColor,
      "cea255be": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$Q, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$x, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$g, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.projectName ? (openBlock(), createElementBlock("li", _hoisted_4$4, toDisplayString(item.projectName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$4, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$4, [
                _hoisted_7$3,
                createElementVNode("div", _hoisted_8$2, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.projectContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReProjectExperience4 = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-9d6f95d0"]]);
const _withScopeId$2 = (n) => (pushScopeId("data-v-56b4dd74"), n = n(), popScopeId(), n);
const _hoisted_1$P = { class: "project-experience" };
const _hoisted_2$w = { class: "project-experience-list" };
const _hoisted_3$f = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$3 = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$3 = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$3 = { class: "job-content" };
const _hoisted_7$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "项目内容", -1));
const _hoisted_8$1 = { class: "content-list" };
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "200c31e5": _ctx.modelStyle.pTop,
      "4c6e9f9b": _ctx.modelStyle.pBottom,
      "530fe2e5": _ctx.modelStyle.pLeftRight,
      "a4882450": _ctx.modelStyle.mBottom,
      "200ad4c8": _ctx.modelStyle.mTop,
      "98d7b38c": _ctx.modelStyle.themeColor,
      "09edb34d": unref(left),
      "653b5770": _ctx.modelStyle.titleFontSize,
      "2923fb0b": _ctx.modelStyle.titleColor,
      "04b1c0ff": _ctx.modelStyle.titleFontWeight,
      "11c4ac5d": _ctx.modelStyle.textFontSize,
      "4985a316": _ctx.modelStyle.textColor,
      "8c433058": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$P, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$w, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$f, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.projectName ? (openBlock(), createElementBlock("li", _hoisted_4$3, toDisplayString(item.projectName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$3, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$3, [
                _hoisted_7$2,
                createElementVNode("div", _hoisted_8$1, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.projectContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReProjectExperience5 = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-56b4dd74"]]);
const _withScopeId$1 = (n) => (pushScopeId("data-v-c32d5d19"), n = n(), popScopeId(), n);
const _hoisted_1$O = { class: "project-experience-content" };
const _hoisted_2$v = { class: "project-experience-list" };
const _hoisted_3$e = {
  key: 0,
  class: "list-title"
};
const _hoisted_4$2 = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$2 = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$2 = { class: "job-content" };
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("p", { class: "left" }, "项目内容", -1));
const _hoisted_8 = { class: "content-list" };
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "0d31585e": _ctx.modelStyle.titleFontSize,
      "09a55fbc": _ctx.modelStyle.titleColor,
      "43750248": _ctx.modelStyle.titleFontWeight,
      "f265d098": _ctx.modelStyle.textFontSize,
      "2701cf1f": _ctx.modelStyle.textColor,
      "0e79596b": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$O, [
        createElementVNode("div", _hoisted_2$v, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$e, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.projectName ? (openBlock(), createElementBlock("li", _hoisted_4$2, toDisplayString(item.projectName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$2, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$2, [
                _hoisted_7$1,
                createElementVNode("div", _hoisted_8, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.projectContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ProjectExperience1Vue$1 = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-c32d5d19"]]);
const _hoisted_1$N = { class: "project-experience" };
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "cc090d3a": _ctx.modelStyle.pTop,
      "0ec18146": _ctx.modelStyle.pBottom,
      "417f13e3": _ctx.modelStyle.pLeftRight,
      "59ec8d9a": _ctx.modelStyle.mBottom,
      "cc0bc774": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$N, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(ProjectExperience1Vue$1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReProjectExperience6 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-ef68e543"]]);
const _hoisted_1$M = { class: "project-experience-content" };
const _hoisted_2$u = { class: "project-experience-list" };
const _hoisted_3$d = {
  key: 0,
  class: "list-title start-end-date"
};
const _hoisted_4$1 = {
  key: 1,
  class: "list-title"
};
const _hoisted_5$1 = {
  key: 2,
  class: "list-title"
};
const _hoisted_6$1 = { class: "job-content" };
const _hoisted_7 = { class: "content-list" };
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience2",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "df50ea68": _ctx.modelStyle.titleFontSize,
      "78c9f307": _ctx.modelStyle.titleColor,
      "419932fa": _ctx.modelStyle.titleFontWeight,
      "0fcc9559": _ctx.modelStyle.textFontSize,
      "0cfa88cc": _ctx.modelStyle.textColor,
      "559001d0": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$M, [
        createElementVNode("div", _hoisted_2$u, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list"
            }, [
              createElementVNode("ul", null, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("li", _hoisted_3$d, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.projectName ? (openBlock(), createElementBlock("li", _hoisted_4$1, toDisplayString(item.projectName), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.posts ? (openBlock(), createElementBlock("li", _hoisted_5$1, toDisplayString(item.posts), 1)) : createCommentVNode("", true)
              ]),
              createElementVNode("div", _hoisted_6$1, [
                createElementVNode("div", _hoisted_7, [
                  createElementVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.projectContent, (list, j) => {
                      return withDirectives((openBlock(), createElementBlock("li", { key: j })), [
                        [_directive_dompurify_html, list.content]
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ProjectExperience1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-b67fb696"]]);
const _hoisted_1$L = { class: "project-experience" };
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "13235bbd": _ctx.modelStyle.pTop,
      "00fd06c3": _ctx.modelStyle.pBottom,
      "4ab36a86": _ctx.modelStyle.pLeftRight,
      "624a5500": _ctx.modelStyle.mBottom,
      "1321fea0": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$L, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(ProjectExperience1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReProjectExperience7 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-7a3473c4"]]);
const _hoisted_1$K = { class: "project-experience" };
const _hoisted_2$t = { class: "model-border-box" };
const _hoisted_3$c = { class: "icon-box" };
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "0a58ba1c": _ctx.modelStyle.pLeftRight,
      "57b7213f": _ctx.modelStyle.mTop,
      "69523a01": _ctx.modelStyle.mBottom,
      "6adcfd71": _ctx.modelStyle.themeColor,
      "0804ebc4": _ctx.modelStyle.pBottom,
      "57b87e5c": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$K, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$t, [
          createElementVNode("div", _hoisted_3$c, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(ProjectExperience1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReProjectExperience8 = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-b7c42b25"]]);
const _hoisted_1$J = { class: "project-experience" };
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "cdc165e8": _ctx.modelStyle.pTop,
      "3a5941d8": _ctx.modelStyle.pBottom,
      "6d947668": _ctx.modelStyle.pLeftRight,
      "4420ad51": _ctx.modelStyle.mBottom,
      "cdc42022": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$J, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(ProjectExperience1Vue$1, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReProjectExperience9 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-a1d66728"]]);
const _withScopeId = (n) => (pushScopeId("data-v-73660d7e"), n = n(), popScopeId(), n);
const _hoisted_1$I = { class: "project-experience" };
const _hoisted_2$s = { class: "project-experience-10-content-box" };
const _hoisted_3$b = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "left" }, [
  /* @__PURE__ */ createElementVNode("img", {
    src: _imports_0,
    alt: "列表"
  }),
  /* @__PURE__ */ createElementVNode("img", {
    class: "moduleborder",
    src: _imports_1,
    alt: "边框"
  })
], -1));
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "ProjectExperience",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2c274b97": _ctx.modelStyle.pTop,
      "1221d0a9": _ctx.modelStyle.pBottom,
      "3a6d21d2": _ctx.modelStyle.pLeftRight,
      "736f1ee6": _ctx.modelStyle.mBottom,
      "2c25ee7a": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$I, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$s, [
          _hoisted_3$b,
          createVNode(ProjectExperience1Vue$1, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReProjectExperience10 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-73660d7e"]]);
const _hoisted_1$H = { class: "awards" };
const _hoisted_2$r = { class: "awards-list" };
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2ce9a03a": _ctx.modelStyle.pTop,
      "68991526": _ctx.modelStyle.pBottom,
      "04147d7a": _ctx.modelStyle.pLeftRight,
      "6c33393a": _ctx.modelStyle.mBottom,
      "2ce8431d": _ctx.modelStyle.mTop,
      "d7e6149c": _ctx.modelStyle.textFontSize,
      "04e8e1e1": _ctx.modelStyle.textColor,
      "698ca02e": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$H, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$r, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("ul", { key: index }, [
              withDirectives(createElementVNode("li", null, toDisplayString(unref(formatDate)(item.date)), 513), [
                [vShow, _ctx.modelData.isShow.date]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(item.awardsName), 513), [
                [vShow, _ctx.modelData.isShow.awardsName]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(item.awardsGrade), 513), [
                [vShow, _ctx.modelData.isShow.awardsGrade]
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReAwards1 = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-eaf8f432"]]);
const _hoisted_1$G = { class: "edu-background" };
const _hoisted_2$q = { class: "edu-list" };
const _hoisted_3$a = { class: "date-school-box" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { key: 1 };
const _hoisted_6 = {
  key: 0,
  class: "majorCourse"
};
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "Awards",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "ef575934": _ctx.modelStyle.pTop,
      "a33cfb0c": _ctx.modelStyle.pBottom,
      "8a01c0b4": _ctx.modelStyle.pLeftRight,
      "0faed0b7": _ctx.modelStyle.mBottom,
      "ef5a136e": _ctx.modelStyle.mTop,
      "729d5832": _ctx.modelStyle.titleFontSize,
      "ddd99068": _ctx.modelStyle.titleColor,
      "33815644": _ctx.modelStyle.titleFontWeight,
      "3ad7bcde": _ctx.modelStyle.textFontSize,
      "0b696b96": _ctx.modelStyle.textColor,
      "2b2147d6": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$G, [
        createVNode(ModelTitle$6, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("div", _hoisted_2$q, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "list-item"
            }, [
              createElementVNode("div", _hoisted_3$a, [
                _ctx.modelData.isShow.date ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(unref(formatDate)(item.date)), 1)) : createCommentVNode("", true),
                _ctx.modelData.isShow.awardsName ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(item.awardsName), 1)) : createCommentVNode("", true)
              ]),
              _ctx.modelData.isShow.awardsGrade ? (openBlock(), createElementBlock("p", _hoisted_6, toDisplayString(item.awardsGrade), 1)) : createCommentVNode("", true)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReAwards2 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-ba5e5302"]]);
const _hoisted_1$F = { class: "awards" };
const _hoisted_2$p = { class: "awards-list" };
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "AwardsCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "8b09258a": _ctx.modelStyle.pTop,
      "02989c85": _ctx.modelStyle.pBottom,
      "1982748a": _ctx.modelStyle.pLeftRight,
      "63e5eac2": _ctx.modelStyle.mBottom,
      "8b0bdfc4": _ctx.modelStyle.mTop,
      "53c30910": _ctx.modelStyle.themeColor,
      "63f231b7": unref(left),
      "61c631b3": _ctx.modelStyle.textFontSize,
      "1d240d80": _ctx.modelStyle.textColor,
      "0f93efaa": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$F, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("div", _hoisted_2$p, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("ul", { key: index }, [
              withDirectives(createElementVNode("li", null, toDisplayString(unref(formatDate)(item.date)), 513), [
                [vShow, _ctx.modelData.isShow.date]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(item.awardsName), 513), [
                [vShow, _ctx.modelData.isShow.awardsName]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(item.awardsGrade), 513), [
                [vShow, _ctx.modelData.isShow.awardsGrade]
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const AwardsComVue = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-b1232b60"]]);
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "Awards",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(AwardsComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _hoisted_1$E = { class: "awards" };
const _hoisted_2$o = { class: "awards-list" };
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "Awards",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "ea7bed16": _ctx.modelStyle.pTop,
      "4b96de0b": _ctx.modelStyle.pBottom,
      "3f49ce75": _ctx.modelStyle.pLeftRight,
      "a637a770": _ctx.modelStyle.mBottom,
      "ea7ea750": _ctx.modelStyle.mTop,
      "c063dc6c": _ctx.modelStyle.themeColor,
      "7472f5bd": unref(left),
      "519c1826": _ctx.modelStyle.textFontSize,
      "1f980586": _ctx.modelStyle.textColor,
      "4dcfe938": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$E, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$o, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("ul", { key: index }, [
              withDirectives(createElementVNode("li", null, toDisplayString(unref(formatDate)(item.date)), 513), [
                [vShow, _ctx.modelData.isShow.date]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(item.awardsName), 513), [
                [vShow, _ctx.modelData.isShow.awardsName]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(item.awardsGrade), 513), [
                [vShow, _ctx.modelData.isShow.awardsGrade]
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReAwards4 = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-cb097ef0"]]);
const _hoisted_1$D = { class: "awards" };
const _hoisted_2$n = { class: "awards-list" };
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "Awards",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "a96bf592": _ctx.modelStyle.pTop,
      "07bd99ee": _ctx.modelStyle.pBottom,
      "712270b7": _ctx.modelStyle.pLeftRight,
      "5d6e8146": _ctx.modelStyle.mBottom,
      "a96eafcc": _ctx.modelStyle.mTop,
      "5cb297e8": _ctx.modelStyle.themeColor,
      "925a818a": unref(left),
      "1529e4a2": _ctx.modelStyle.textFontSize,
      "523dd9f8": _ctx.modelStyle.textColor,
      "4d71bca6": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$D, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$n, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("ul", { key: index }, [
              withDirectives(createElementVNode("li", null, toDisplayString(unref(formatDate)(item.date)), 513), [
                [vShow, _ctx.modelData.isShow.date]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(item.awardsName), 513), [
                [vShow, _ctx.modelData.isShow.awardsName]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(item.awardsGrade), 513), [
                [vShow, _ctx.modelData.isShow.awardsGrade]
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReAwards5 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-75a5c2da"]]);
const _hoisted_1$C = { class: "awards-content" };
const _hoisted_2$m = { class: "awards-list" };
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "Awards1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2cbb1e03": _ctx.modelStyle.textFontSize,
      "10c1f9a0": _ctx.modelStyle.textColor,
      "1e01f00c": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$C, [
        createElementVNode("div", _hoisted_2$m, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("ul", { key: index }, [
              withDirectives(createElementVNode("li", { class: "start-end-date" }, toDisplayString(unref(formatDate)(item.date)), 513), [
                [vShow, _ctx.modelData.isShow.date]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(item.awardsName), 513), [
                [vShow, _ctx.modelData.isShow.awardsName]
              ]),
              withDirectives(createElementVNode("li", null, toDisplayString(item.awardsGrade), 513), [
                [vShow, _ctx.modelData.isShow.awardsGrade]
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const Awards1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-66191a0b"]]);
const _hoisted_1$B = { class: "awards" };
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "Awards",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "d9a1bd7e": _ctx.modelStyle.pTop,
      "4a49ba82": _ctx.modelStyle.pBottom,
      "58c0dd41": _ctx.modelStyle.pLeftRight,
      "3c2870fc": _ctx.modelStyle.mBottom,
      "d9a477b8": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$B, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(Awards1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReAwards6 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-d80d55d0"]]);
const _hoisted_1$A = { class: "awards" };
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "Awards",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2ddec2cb": _ctx.modelStyle.pTop,
      "518ac616": _ctx.modelStyle.pBottom,
      "438faf4b": _ctx.modelStyle.pLeftRight,
      "3887eb32": _ctx.modelStyle.mBottom,
      "2ddd65ae": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$A, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(Awards1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReAwards7 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-527017d2"]]);
const _hoisted_1$z = { class: "awards" };
const _hoisted_2$l = { class: "model-border-box" };
const _hoisted_3$9 = { class: "icon-box" };
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "Awards",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "616b1a81": _ctx.modelStyle.pLeftRight,
      "029ef164": _ctx.modelStyle.mTop,
      "40ad8888": _ctx.modelStyle.mBottom,
      "7c214454": _ctx.modelStyle.themeColor,
      "7e5bed7f": _ctx.modelStyle.pBottom,
      "02a04e81": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$z, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$l, [
          createElementVNode("div", _hoisted_3$9, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(Awards1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReAwards8 = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-53f185d2"]]);
const _hoisted_1$y = { class: "awards" };
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "Awards",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "e4a0e5da": _ctx.modelStyle.pTop,
      "015e4dad": _ctx.modelStyle.pBottom,
      "12e1a393": _ctx.modelStyle.pLeftRight,
      "62ab9bea": _ctx.modelStyle.mBottom,
      "e4a3a014": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$y, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(Awards1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReAwards9 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-1cc33069"]]);
const _hoisted_1$x = { class: "awards" };
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "Awards",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "155be648": _ctx.modelStyle.pTop,
      "72bf6c58": _ctx.modelStyle.pBottom,
      "27d18108": _ctx.modelStyle.pLeftRight,
      "57e68ad6": _ctx.modelStyle.mBottom,
      "155a892b": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$x, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(Awards1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReAwards10 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-1d385280"]]);
const _hoisted_1$w = { class: "hobbies" };
const _hoisted_2$k = { class: "hobbies-content" };
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "f2abc318": _ctx.modelStyle.pTop,
      "1f8b96a8": _ctx.modelStyle.pBottom,
      "5b27e834": _ctx.modelStyle.pLeftRight,
      "518782e9": _ctx.modelStyle.mBottom,
      "f2ae7d52": _ctx.modelStyle.mTop,
      "73f099ec": _ctx.modelStyle.textFontSize,
      "28c037e7": _ctx.modelStyle.textColor,
      "40c52da3": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$w, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$k, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const ReHobbies1 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-0035d6e2"]]);
const _hoisted_1$v = { class: "hobbies" };
const _hoisted_2$j = { class: "hobbies-content" };
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "Hobbies",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "4574d572": _ctx.modelStyle.pTop,
      "cf419624": _ctx.modelStyle.pBottom,
      "f5fe2e9c": _ctx.modelStyle.pLeftRight,
      "0ca6f9aa": _ctx.modelStyle.mBottom,
      "45737855": _ctx.modelStyle.mTop,
      "e8e91a2c": _ctx.modelStyle.textFontSize,
      "5ba62fa9": _ctx.modelStyle.textColor,
      "45e481be": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$v, [
        createVNode(ModelTitle$6, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("div", _hoisted_2$j, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const ReHobbies2 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-57fc0eb1"]]);
const _hoisted_1$u = { class: "hobbies" };
const _hoisted_2$i = { class: "hobbies-content" };
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "HobbiesCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "5f0c8168": _ctx.modelStyle.pTop,
      "6928c4d4": _ctx.modelStyle.pBottom,
      "5501870c": _ctx.modelStyle.pLeftRight,
      "6b13d9de": _ctx.modelStyle.mBottom,
      "5f0f3ba2": _ctx.modelStyle.mTop,
      "94f46b3e": _ctx.modelStyle.themeColor,
      "52daff74": unref(left),
      "5ddde2c4": _ctx.modelStyle.textFontSize,
      "204b5e0f": _ctx.modelStyle.textColor,
      "6483a07b": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$u, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("div", _hoisted_2$i, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const HobbiesComVue = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-44d16662"]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "Hobbies",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(HobbiesComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _hoisted_1$t = { class: "hobbies" };
const _hoisted_2$h = { class: "hobbies-content" };
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "Hobbies",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "2442aecd": _ctx.modelStyle.pTop,
      "e57fcc9a": _ctx.modelStyle.pBottom,
      "4c1f11cd": _ctx.modelStyle.pLeftRight,
      "22e53020": _ctx.modelStyle.mBottom,
      "244151b0": _ctx.modelStyle.mTop,
      "a6b955bc": _ctx.modelStyle.themeColor,
      "3c379136": unref(left),
      "03c3c145": _ctx.modelStyle.textFontSize,
      "c83e11a4": _ctx.modelStyle.textColor,
      "286be2bc": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$t, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$h, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const ReHobbies4 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-e0889ce8"]]);
const _hoisted_1$s = { class: "hobbies" };
const _hoisted_2$g = { class: "hobbies-content" };
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "Hobbies",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "5c0bec28": _ctx.modelStyle.pTop,
      "70bb1a78": _ctx.modelStyle.pBottom,
      "731d9ee8": _ctx.modelStyle.pLeftRight,
      "5bef2e96": _ctx.modelStyle.mBottom,
      "5c0a8f0b": _ctx.modelStyle.mTop,
      "58bc3b86": _ctx.modelStyle.themeColor,
      "adc8762c": unref(left),
      "655373a0": _ctx.modelStyle.textFontSize,
      "e6c24a9a": _ctx.modelStyle.textColor,
      "64d86a57": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$s, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$g, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const ReHobbies5 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-a0563165"]]);
const _hoisted_1$r = { class: "hobbies-content" };
const _hoisted_2$f = { class: "hobbies-content" };
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "Hobbies1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "5208f278": _ctx.modelStyle.textFontSize,
      "fe9f8be2": _ctx.modelStyle.textColor,
      "0cc8447b": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$r, [
        createElementVNode("div", _hoisted_2$f, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const Hobbies1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-712d1174"]]);
const _hoisted_1$q = { class: "hobbies" };
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "Hobbies",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "7f89602e": _ctx.modelStyle.pTop,
      "74dbe0b2": _ctx.modelStyle.pBottom,
      "55cd1324": _ctx.modelStyle.pLeftRight,
      "53ada222": _ctx.modelStyle.mBottom,
      "7f880311": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$q, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(Hobbies1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReHobbies6 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-1e25467e"]]);
const _hoisted_1$p = { class: "hobbies" };
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "Hobbies",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "6cb33d94": _ctx.modelStyle.pTop,
      "6fb7418c": _ctx.modelStyle.pBottom,
      "54652f54": _ctx.modelStyle.pLeftRight,
      "5df6e06e": _ctx.modelStyle.mBottom,
      "6cb1e077": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$p, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(Hobbies1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReHobbies7 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-66553cf7"]]);
const _hoisted_1$o = { class: "hobbies" };
const _hoisted_2$e = { class: "model-border-box" };
const _hoisted_3$8 = { class: "icon-box" };
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "Hobbies",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "c16cebfc": _ctx.modelStyle.pLeftRight,
      "65e355a5": _ctx.modelStyle.mTop,
      "9910384a": _ctx.modelStyle.mBottom,
      "00646552": _ctx.modelStyle.themeColor,
      "522a959e": _ctx.modelStyle.pBottom,
      "65e4b2c2": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$o, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$e, [
          createElementVNode("div", _hoisted_3$8, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(Hobbies1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReHobbies8 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-2cdcab46"]]);
const _hoisted_1$n = { class: "hobbies" };
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "Hobbies",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "6ca7f97b": _ctx.modelStyle.pTop,
      "50ada845": _ctx.modelStyle.pBottom,
      "766121fb": _ctx.modelStyle.pLeftRight,
      "9c0a12fc": _ctx.modelStyle.mBottom,
      "6ca69c5e": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(Hobbies1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReHobbies9 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-2eee626a"]]);
const _hoisted_1$m = { class: "hobbies" };
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "Hobbies",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "6018499c": _ctx.modelStyle.pTop,
      "e8ab4ef8": _ctx.modelStyle.pBottom,
      "4bf9d548": _ctx.modelStyle.pLeftRight,
      "2610b27e": _ctx.modelStyle.mBottom,
      "6016ec7f": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$m, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(Hobbies1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReHobbies10 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-6d5d4c5b"]]);
const _hoisted_1$l = { class: "self-eavluation" };
const _hoisted_2$d = { class: "self-eavluation-content" };
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3091ad41": _ctx.modelStyle.pTop,
      "2c45d282": _ctx.modelStyle.pBottom,
      "65eb2d7e": _ctx.modelStyle.pLeftRight,
      "4b2a64fc": _ctx.modelStyle.mBottom,
      "30905024": _ctx.modelStyle.mTop,
      "1191e88e": _ctx.modelStyle.textFontSize,
      "4532e13a": _ctx.modelStyle.textColor,
      "0c366030": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$l, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$d, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const ReSelfEvaluation1 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-d6004ac8"]]);
const _hoisted_1$k = { class: "self-eavluation" };
const _hoisted_2$c = { class: "self-eavluation-content" };
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluation",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "176918b8": _ctx.modelStyle.pTop,
      "307fe3e8": _ctx.modelStyle.pBottom,
      "6f29c110": _ctx.modelStyle.pLeftRight,
      "dc659bb6": _ctx.modelStyle.mBottom,
      "1767bb9b": _ctx.modelStyle.mTop,
      "c579dfa0": _ctx.modelStyle.textFontSize,
      "6e570823": _ctx.modelStyle.textColor,
      "5f5322e7": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$k, [
        createVNode(ModelTitle$6, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("div", _hoisted_2$c, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const ReSelfEvaluation2 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-cf94f2f9"]]);
const _hoisted_1$j = { class: "self-eavluation" };
const _hoisted_2$b = { class: "self-eavluation-content" };
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluationCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "8fafa290": _ctx.modelStyle.pTop,
      "6d610de8": _ctx.modelStyle.pBottom,
      "6701b578": _ctx.modelStyle.pLeftRight,
      "62a347b6": _ctx.modelStyle.mBottom,
      "8fb25cca": _ctx.modelStyle.mTop,
      "70f40e66": _ctx.modelStyle.themeColor,
      "bbe1074c": unref(left),
      "1ee7b3a0": _ctx.modelStyle.textFontSize,
      "10d49bba": _ctx.modelStyle.textColor,
      "04aeb8e7": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$j, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("div", _hoisted_2$b, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const SelfEvaluationComVue = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-9f9f27db"]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluation",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(SelfEvaluationComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _hoisted_1$i = { class: "self-eavluation" };
const _hoisted_2$a = { class: "self-eavluation-content" };
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluation",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "7746c2c2": _ctx.modelStyle.pTop,
      "90e97ebe": _ctx.modelStyle.pBottom,
      "0ba65c1f": _ctx.modelStyle.pLeftRight,
      "18d88ede": _ctx.modelStyle.mBottom,
      "77497cfc": _ctx.modelStyle.mTop,
      "6c2a9f74": _ctx.modelStyle.themeColor,
      "4b3c125a": unref(left),
      "02bc81d2": _ctx.modelStyle.textFontSize,
      "5ffe1a9c": _ctx.modelStyle.textColor,
      "387c97e4": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$i, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$a, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const ReSelfEvaluation4 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-bfb12b3f"]]);
const _hoisted_1$h = { class: "self-eavluation" };
const _hoisted_2$9 = { class: "self-eavluation-content" };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluation",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "4c2e5346": _ctx.modelStyle.pTop,
      "2438f69a": _ctx.modelStyle.pBottom,
      "1691b786": _ctx.modelStyle.pLeftRight,
      "f4f37652": _ctx.modelStyle.mBottom,
      "4c2cf629": _ctx.modelStyle.mTop,
      "7715fadb": _ctx.modelStyle.themeColor,
      "5cb2a48c": unref(left),
      "07b84684": _ctx.modelStyle.textFontSize,
      "58163655": _ctx.modelStyle.textColor,
      "ed99f816": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$h, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$9, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const ReSelfEvaluation5 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-52e016ce"]]);
const _hoisted_1$g = { class: "self-eavluation-content" };
const _hoisted_2$8 = { class: "self-eavluation-content" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluation1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "7f9c683a": _ctx.modelStyle.textFontSize,
      "64a9bc59": _ctx.modelStyle.textColor,
      "10b6a071": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      const _directive_dompurify_html = resolveDirective("dompurify-html");
      return openBlock(), createElementBlock("div", _hoisted_1$g, [
        createElementVNode("div", _hoisted_2$8, [
          withDirectives(createElementVNode("p", null, null, 512), [
            [_directive_dompurify_html, _ctx.modelData.content]
          ])
        ])
      ]);
    };
  }
});
const SelfEvaluation1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-0e0d8d20"]]);
const _hoisted_1$f = { class: "self-eavluation" };
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluation",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "ab16eb34": _ctx.modelStyle.pTop,
      "1d7c290c": _ctx.modelStyle.pBottom,
      "3bda16a6": _ctx.modelStyle.pLeftRight,
      "528f39b7": _ctx.modelStyle.mBottom,
      "ab19a56e": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SelfEvaluation1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSelfEvaluation6 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-f1363213"]]);
const _hoisted_1$e = { class: "self-eavluation" };
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluation",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "da235a98": _ctx.modelStyle.pTop,
      "6536986c": _ctx.modelStyle.pBottom,
      "2203ec74": _ctx.modelStyle.pLeftRight,
      "72f832ae": _ctx.modelStyle.mBottom,
      "da2614d2": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$e, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SelfEvaluation1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSelfEvaluation7 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-e5be7cac"]]);
const _hoisted_1$d = { class: "self-eavluation" };
const _hoisted_2$7 = { class: "model-border-box" };
const _hoisted_3$7 = { class: "icon-box" };
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluation",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3bd939c0": _ctx.modelStyle.pLeftRight,
      "d254457a": _ctx.modelStyle.mTop,
      "7a286106": _ctx.modelStyle.mBottom,
      "4297a675": _ctx.modelStyle.themeColor,
      "619e8140": _ctx.modelStyle.pBottom,
      "d2518b40": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2$7, [
          createElementVNode("div", _hoisted_3$7, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(SelfEvaluation1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReSelfEvaluation8 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-15c8f13d"]]);
const _hoisted_1$c = { class: "self-eavluation" };
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluation",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "0582ca92": _ctx.modelStyle.pTop,
      "39a2ad89": _ctx.modelStyle.pBottom,
      "209e3392": _ctx.modelStyle.pLeftRight,
      "ca200874": _ctx.modelStyle.mBottom,
      "058584cc": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SelfEvaluation1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSelfEvaluation9 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-e83ba706"]]);
const _hoisted_1$b = { class: "self-eavluation" };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "SelfEvaluation",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3506c579": _ctx.modelStyle.pTop,
      "bf6b18f2": _ctx.modelStyle.pBottom,
      "0daa7779": _ctx.modelStyle.pLeftRight,
      "0197c1c4": _ctx.modelStyle.mBottom,
      "3505685c": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(SelfEvaluation1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReSelfEvaluation10 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-e808f98f"]]);
const _hoisted_1$a = { class: "works-display" };
const _hoisted_2$6 = { class: "works-display-list" };
const _hoisted_3$6 = ["href"];
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "b48ccb2e": _ctx.modelStyle.pTop,
      "7b243897": _ctx.modelStyle.pBottom,
      "1c744f2e": _ctx.modelStyle.pLeftRight,
      "471cf258": _ctx.modelStyle.mBottom,
      "b48f8568": _ctx.modelStyle.mTop,
      "4a595e3e": _ctx.modelStyle.textFontSize,
      "bd8e25dc": _ctx.modelStyle.textColor,
      "79d5fb58": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createVNode(ModelTitle$7, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("ul", _hoisted_2$6, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("li", { key: index }, [
              createElementVNode("h1", null, toDisplayString(item.worksName), 1),
              createElementVNode("a", {
                href: item.worksLink,
                target: "_blank"
              }, toDisplayString(item.worksLink), 9, _hoisted_3$6)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReWorksDisplay1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-b108870f"]]);
const _hoisted_1$9 = { class: "works-display" };
const _hoisted_2$5 = { class: "works-display-list" };
const _hoisted_3$5 = ["href"];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplay",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "cf1f4136": _ctx.modelStyle.pTop,
      "5e39821b": _ctx.modelStyle.pBottom,
      "48081f36": _ctx.modelStyle.pLeftRight,
      "80f25f50": _ctx.modelStyle.mBottom,
      "cf21fb70": _ctx.modelStyle.mTop,
      "0fe359dd": _ctx.modelStyle.textFontSize,
      "1421e596": _ctx.modelStyle.textColor,
      "a9f09558": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createVNode(ModelTitle$6, {
          title: _ctx.modelData.title,
          iconfont: _ctx.modelData.iconfont,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "iconfont", "model-style"]),
        createElementVNode("ul", _hoisted_2$5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("li", { key: index }, [
              createElementVNode("h1", null, toDisplayString(item.worksName), 1),
              createElementVNode("a", {
                href: item.worksLink,
                target: "_blank"
              }, toDisplayString(item.worksLink), 9, _hoisted_3$5)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReWorksDisplay2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-df09de04"]]);
const _hoisted_1$8 = { class: "works-display" };
const _hoisted_2$4 = { class: "works-display-list" };
const _hoisted_3$4 = ["href"];
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplayCom",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "48639145": _ctx.modelStyle.pTop,
      "47daf78a": _ctx.modelStyle.pBottom,
      "370b8b76": _ctx.modelStyle.pLeftRight,
      "3d5fd278": _ctx.modelStyle.mBottom,
      "48623428": _ctx.modelStyle.mTop,
      "44fe7d9a": _ctx.modelStyle.themeColor,
      "3b0fa026": unref(left),
      "1c12a886": _ctx.modelStyle.textFontSize,
      "7fc2dfb6": _ctx.modelStyle.textColor,
      "558e0f34": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        renderSlot(_ctx.$slots, "model-title", {}, void 0, true),
        createElementVNode("ul", _hoisted_2$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("li", { key: index }, [
              createElementVNode("h1", null, toDisplayString(item.worksName), 1),
              createElementVNode("a", {
                href: item.worksLink,
                target: "_blank"
              }, toDisplayString(item.worksLink), 9, _hoisted_3$4)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const WorksDisplayComVue = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-4f991384"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplay",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(WorksDisplayComVue, {
        "model-data": _ctx.modelData,
        "model-style": _ctx.modelStyle
      }, {
        "model-title": withCtx(() => [
          createVNode(ModelTitleVue, {
            title: _ctx.modelData.title,
            iconfont: _ctx.modelData.iconfont
          }, null, 8, ["title", "iconfont"])
        ]),
        _: 1
      }, 8, ["model-data", "model-style"]);
    };
  }
});
const _hoisted_1$7 = { class: "works-display" };
const _hoisted_2$3 = { class: "works-display-list" };
const _hoisted_3$3 = ["href"];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplay",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3dfe2410": _ctx.modelStyle.pTop,
      "670df2b0": _ctx.modelStyle.pBottom,
      "e4c3f690": _ctx.modelStyle.pLeftRight,
      "2dc654e5": _ctx.modelStyle.mBottom,
      "3e00de4a": _ctx.modelStyle.mTop,
      "23bb6fe6": _ctx.modelStyle.themeColor,
      "6135c51a": unref(left),
      "3d5cb520": _ctx.modelStyle.textFontSize,
      "1edb0a3a": _ctx.modelStyle.textColor,
      "4bdd2fb2": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createVNode(ModelTitle$5, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("ul", _hoisted_2$3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("li", { key: index }, [
              createElementVNode("h1", null, toDisplayString(item.worksName), 1),
              createElementVNode("a", {
                href: item.worksLink,
                target: "_blank"
              }, toDisplayString(item.worksLink), 9, _hoisted_3$3)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReWorksDisplay4 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-d552f6cb"]]);
const _hoisted_1$6 = { class: "works-display" };
const _hoisted_2$2 = { class: "works-display-list" };
const _hoisted_3$2 = ["href"];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplay",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "359c3aa0": _ctx.modelStyle.pTop,
      "de52ce00": _ctx.modelStyle.pBottom,
      "5ab19940": _ctx.modelStyle.pLeftRight,
      "1bb83186": _ctx.modelStyle.mBottom,
      "359add83": _ctx.modelStyle.mTop,
      "332b76b5": _ctx.modelStyle.themeColor,
      "7fabd172": unref(left),
      "08c9ca18": _ctx.modelStyle.textFontSize,
      "13d4d73b": _ctx.modelStyle.textColor,
      "041302cf": _ctx.modelStyle.textFontWeight
    }));
    const props = __props;
    const { left } = useGetLineLeft(props.modelStyle, -23);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createVNode(ModelTitle$4, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("ul", _hoisted_2$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("li", { key: index }, [
              createElementVNode("h1", null, toDisplayString(item.worksName), 1),
              createElementVNode("a", {
                href: item.worksLink,
                target: "_blank"
              }, toDisplayString(item.worksLink), 9, _hoisted_3$2)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ReWorksDisplay5 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-11b41e2a"]]);
const _hoisted_1$5 = { class: "works-display-content" };
const _hoisted_2$1 = { class: "works-display-list" };
const _hoisted_3$1 = ["href"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplay1",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "58d561de": _ctx.modelStyle.textFontSize,
      "0bf31ce2": _ctx.modelStyle.textColor,
      "4a112d88": _ctx.modelStyle.textFontWeight
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createElementVNode("ul", _hoisted_2$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelData.LIST, (item, index) => {
            return openBlock(), createElementBlock("li", { key: index }, [
              createElementVNode("h1", null, toDisplayString(item.worksName), 1),
              createElementVNode("a", {
                href: item.worksLink,
                target: "_blank"
              }, toDisplayString(item.worksLink), 9, _hoisted_3$1)
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const WorksDisplay1Vue = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-e9b025b9"]]);
const _hoisted_1$4 = { class: "works-display" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplay",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "1bf0cf0c": _ctx.modelStyle.pTop,
      "5d7a9d14": _ctx.modelStyle.pBottom,
      "155dc6cc": _ctx.modelStyle.pLeftRight,
      "8270295e": _ctx.modelStyle.mBottom,
      "1bef71ef": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createVNode(ModelTitle$3, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(WorksDisplay1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReWorksDisplay6 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d1cef23a"]]);
const _hoisted_1$3 = { class: "works-display" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplay",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "84766d52": _ctx.modelStyle.pTop,
      "788e7ae9": _ctx.modelStyle.pBottom,
      "22419cd7": _ctx.modelStyle.pLeftRight,
      "4c486db4": _ctx.modelStyle.mBottom,
      "8479278c": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(WorksDisplay1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReWorksDisplay7 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-5cc81183"]]);
const _hoisted_1$2 = { class: "works-display" };
const _hoisted_2 = { class: "model-border-box" };
const _hoisted_3 = { class: "icon-box" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplay",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "628e4c68": _ctx.modelStyle.pLeftRight,
      "6fd4c4ef": _ctx.modelStyle.mTop,
      "6b048f5e": _ctx.modelStyle.mBottom,
      "2f3d1d21": _ctx.modelStyle.themeColor,
      "69306a14": _ctx.modelStyle.pBottom,
      "6fd6220c": _ctx.modelStyle.pTop
    }));
    return (_ctx, _cache) => {
      const _component_svg_icon = resolveComponent("svg-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(ModelTitle$2, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            createVNode(_component_svg_icon, {
              "icon-name": _ctx.modelData.iconfont,
              color: "#fff",
              size: "15px"
            }, null, 8, ["icon-name"])
          ]),
          createVNode(WorksDisplay1Vue, {
            "model-data": _ctx.modelData,
            "model-style": _ctx.modelStyle
          }, null, 8, ["model-data", "model-style"])
        ])
      ]);
    };
  }
});
const ReWorksDisplay8 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1351655a"]]);
const _hoisted_1$1 = { class: "works-display" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplay",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "23a44628": _ctx.modelStyle.pTop,
      "e9e6ff10": _ctx.modelStyle.pBottom,
      "198a78e8": _ctx.modelStyle.pLeftRight,
      "274c6296": _ctx.modelStyle.mBottom,
      "23a2e90b": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(ModelTitle$1, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(WorksDisplay1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReWorksDisplay9 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-cfe0ffed"]]);
const _hoisted_1 = { class: "works-display" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorksDisplay",
  props: {
    modelData: {},
    modelStyle: {}
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "6a713014": _ctx.modelStyle.pTop,
      "a9d381e8": _ctx.modelStyle.pBottom,
      "678341d4": _ctx.modelStyle.pLeftRight,
      "0c638d49": _ctx.modelStyle.mBottom,
      "6a6fd2f7": _ctx.modelStyle.mTop
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(ModelTitle, {
          title: _ctx.modelData.title,
          "model-style": _ctx.modelStyle
        }, null, 8, ["title", "model-style"]),
        createVNode(WorksDisplay1Vue, {
          "model-data": _ctx.modelData,
          "model-style": _ctx.modelStyle
        }, null, 8, ["model-data", "model-style"])
      ]);
    };
  }
});
const ReWorksDisplay10 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5c4c69de"]]);
const MaterialComponents = {
  ReSquareAvater: SQUARE_AVATAR,
  ReRectangleAvater: RECTANGLE_AVATAR,
  ReCircleAvater: CIRCLE_AVATAR,
  ReCustom1: CUSTOM_1,
  ReCustom2: CUSTOM_2,
  ReEduBackground1,
  ReEduBackground2,
  ReEduBackground3: _sfc_main$2B,
  ReEduBackground4,
  ReEduBackground5,
  ReEduBackground6,
  ReEduBackground7,
  ReEduBackground8,
  ReEduBackground9,
  ReEduBackground10,
  ReEduBackground11,
  ReEduBackground12,
  ReBaseInfo1: _sfc_main$2f,
  ReBaseInfo2: _sfc_main$2c,
  ReBaseInfo3: _sfc_main$29,
  ReBaseInfo4,
  ReBaseInfo5,
  ReBaseInfo6,
  ReBaseInfo7,
  ReBaseInfo8,
  ReResumeTitle1,
  ReResumeTitle2,
  ReJobIntention1,
  ReJobIntention2,
  ReJobIntention3: _sfc_main$20,
  ReJobIntention4,
  ReJobIntention5,
  ReJobIntention6,
  ReJobIntention7,
  ReJobIntention8,
  ReJobIntention9,
  ReJobIntention10,
  ReSkillSpecialties1,
  ReSkillSpecialties2,
  ReSkillSpecialties3: _sfc_main$1Q,
  ReSkillSpecialties4,
  ReSkillSpecialties5,
  ReSkillSpecialties6,
  ReSkillSpecialties7,
  ReSkillSpecialties8,
  ReSkillSpecialties9,
  ReSkillSpecialties10,
  ReSkillSpecialties11,
  ReSkillSpecialties12,
  ReSkillSpecialties13,
  ReSkillSpecialties14,
  ReSkillSpecialties15,
  ReSkillSpecialties16,
  ReCampusExperience1,
  ReCampusExperience2,
  ReCampusExperience3: _sfc_main$1v,
  ReCampusExperience4,
  ReCampusExperience5,
  ReCampusExperience6,
  ReCampusExperience7,
  ReCampusExperience8,
  ReCampusExperience9,
  ReCampusExperience10,
  ReInternshipExperience1,
  ReInternshipExperience2,
  ReInternshipExperience3: _sfc_main$1j,
  ReInternshipExperience4,
  ReInternshipExperience5,
  ReInternshipExperience6,
  ReInternshipExperience7,
  ReInternshipExperience8,
  ReInternshipExperience9,
  ReInternshipExperience10,
  ReWorkExperience1,
  ReWorkExperience2,
  ReWorkExperience3: _sfc_main$16,
  ReWorkExperience4,
  ReWorkExperience5,
  ReWorkExperience6,
  ReWorkExperience7,
  ReWorkExperience8,
  ReWorkExperience9,
  ReWorkExperience10,
  ReProjectExperience1,
  ReProjectExperience2,
  ReProjectExperience3: _sfc_main$V,
  ReProjectExperience4,
  ReProjectExperience5,
  ReProjectExperience6,
  ReProjectExperience7,
  ReProjectExperience8,
  ReProjectExperience9,
  ReProjectExperience10,
  ReAwards1,
  ReAwards2,
  ReAwards3: _sfc_main$I,
  ReAwards4,
  ReAwards5,
  ReAwards6,
  ReAwards7,
  ReAwards8,
  ReAwards9,
  ReAwards10,
  ReHobbies1,
  ReHobbies2,
  ReHobbies3: _sfc_main$w,
  ReHobbies4,
  ReHobbies5,
  ReHobbies6,
  ReHobbies7,
  ReHobbies8,
  ReHobbies9,
  ReHobbies10,
  ReSelfEvaluation1,
  ReSelfEvaluation2,
  ReSelfEvaluation3: _sfc_main$k,
  ReSelfEvaluation4,
  ReSelfEvaluation5,
  ReSelfEvaluation6,
  ReSelfEvaluation7,
  ReSelfEvaluation8,
  ReSelfEvaluation9,
  ReSelfEvaluation10,
  ReWorksDisplay1,
  ReWorksDisplay2,
  ReWorksDisplay3: _sfc_main$8,
  ReWorksDisplay4,
  ReWorksDisplay5,
  ReWorksDisplay6,
  ReWorksDisplay7,
  ReWorksDisplay8,
  ReWorksDisplay9,
  ReWorksDisplay10
};
const currComponents = MaterialComponents;
const ResumeComponent = {
  install(app) {
    for (const key in currComponents) {
      app.component(key, currComponents[key]);
    }
  }
};
for (const key in currComponents) {
  ResumeComponent[key] = currComponents[key];
}
export {
  ResumeComponent as default
};
