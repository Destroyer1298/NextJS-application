/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Akezhan Kaliyev Student ID: 1255988212 Date: 19.03.2023
*
*
********************************************************************************/ 
import React from "react";
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'

export default function AdvancedSearch(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter()
    const { register, handleSubmit, formState:{errors}} = useForm({
        defaultValues: {
            query: "",
            searchBy: "title",
            geoLocation: "",
            medium: "",
            isHighlight: false,
            isOnView: false
        }
    })

    const submitForm = (data) => {
        let key = "/artwork?"
        key += `${data?.searchBy}=true`
        key += data.geoLocation ? `&geoLocation=${data.geoLocation}` : ""
        key += data.medium ? `&medium=${data.medium}` : ""
        key += `&isOnView=${data?.isOnView}`
        key += `&isHighlight=${data?.isHighlight}`
        key += `&q=${data?.key}`
        setSearchHistory([...searchHistory, key])
        router.push(key)
    }

    return (
        <>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="q"
                                {...register("query", { required: true })}
                            />
                            {errors.query?.type === "required" && <p className={styles.invalid}>Search query is required</p>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}>
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" placeholder="" name="medium" {...register("medium")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            name="isHighlight"
                            {...register("isHighlight")}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            name="isOnView"
                            {...register("isOnView")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="primary" type="submit" disabled={Object.keys(errors).length > 0}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>

        </>

    )

}