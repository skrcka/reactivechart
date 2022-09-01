#!/bin/bash
docker run -d -v ${PWD}:/app --name reactivechart --network=chart reactivechart